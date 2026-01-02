// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CrowdfundEscrow
 * @dev Secure vault for a single ClearFund campaign.
 * Implements "All-or-Nothing" funding with milestone-based releases.
 */
contract CrowdfundEscrow {
    
    // --- State Definitions ---
    enum CampaignState { Active, Successful, Failed }

    struct Milestone {
        string description;
        uint256 amount;
        bool isApproved;
        bool isWithdrawn;
    }

    // --- State Variables ---
    address public creator;
    address public verifier; // ClearFund admin or designated auditor
    
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalRaised;
    
    Milestone[] public milestones;
    mapping(address => uint256) public contributions;

    // Reentrancy Guard (Manual implementation to save gas/dependencies)
    bool private locked;

    // --- Events ---
    event DonationReceived(address indexed donor, uint256 amount);
    event MilestoneAdded(uint256 index, string description, uint256 amount);
    event MilestoneApproved(uint256 indexed index, address verifier);
    event FundsWithdrawn(address indexed creator, uint256 amount, uint256 milestoneIndex);
    event RefundClaimed(address indexed donor, uint256 amount);
    event VerifierUpdated(address oldVerifier, address newVerifier);

    // --- Modifiers ---
    modifier nonReentrant() {
        require(!locked, "Reentrancy detected");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyCreator() {
        require(msg.sender == creator, "Not the creator");
        _;
    }

    modifier onlyVerifier() {
        require(msg.sender == verifier, "Not the verifier");
        _;
    }

    // --- Constructor ---
    constructor(
        address _creator,
        address _verifier,
        uint256 _goal,
        uint256 _durationInDays
    ) {
        require(_goal > 0, "Goal must be > 0");
        require(_durationInDays > 0, "Duration must be > 0");
        
        creator = _creator;
        verifier = _verifier;
        goal = _goal;
        deadline = block.timestamp + (_durationInDays * 1 days);
    }

    // --- View Functions ---

    /**
     * @dev Determines the current status based on time and funding.
     * Active: Deadline not passed.
     * Successful: Deadline passed AND Goal met.
     * Failed: Deadline passed AND Goal missed.
     */
    function getCampaignState() public view returns (CampaignState) {
        if (block.timestamp < deadline) {
            return CampaignState.Active;
        }
        if (totalRaised >= goal) {
            return CampaignState.Successful;
        }
        return CampaignState.Failed;
    }

    // --- Core Actions ---

    /**
     * @dev Add milestones. Only allowed before any donations are made to prevent "moving the goalposts".
     */
    function addMilestone(string memory _desc, uint256 _amount) external onlyCreator {
        require(totalRaised == 0, "Cannot edit milestones after funding starts");
        milestones.push(Milestone(_desc, _amount, false, false));
        emit MilestoneAdded(milestones.length - 1, _desc, _amount);
    }

    /**
     * @dev Public funding function. Allows overfunding.
     */
    function contribute() external payable nonReentrant {
        require(getCampaignState() == CampaignState.Active, "Campaign is not active");
        require(msg.value > 0, "Contribution must be > 0");

        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }

    /**
     * @dev Verifier approves a specific milestone.
     */
    function approveMilestone(uint256 _index) external onlyVerifier {
        require(_index < milestones.length, "Invalid milestone index");
        require(!milestones[_index].isApproved, "Already approved");
        
        milestones[_index].isApproved = true;
        emit MilestoneApproved(_index, msg.sender);
    }

    /**
     * @dev Creator withdraws funds for an approved milestone.
     * RESTRICTION: Can only withdraw if campaign was Successful (deadline passed + goal met).
     */
    function withdrawMilestone(uint256 _index) external onlyCreator nonReentrant {
        require(getCampaignState() == CampaignState.Successful, "Campaign did not succeed");
        require(_index < milestones.length, "Invalid milestone index");
        
        Milestone storage ms = milestones[_index];
        
        require(ms.isApproved, "Milestone not approved");
        require(!ms.isWithdrawn, "Already withdrawn");
        require(address(this).balance >= ms.amount, "Insufficient contract balance");

        ms.isWithdrawn = true;
        
        // Interaction: Transfer ETH
        (bool sent, ) = payable(creator).call{value: ms.amount}("");
        require(sent, "ETH transfer failed");

        emit FundsWithdrawn(creator, ms.amount, _index);
    }

    /**
     * @dev Donors recover funds if campaign Failed.
     */
    function claimRefund() external nonReentrant {
        require(getCampaignState() == CampaignState.Failed, "Refunds not available");
        
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contribution found");

        // Effects: Zero out balance before transfer (Reentrancy protection)
        contributions[msg.sender] = 0;

        // Interaction: Refund ETH
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Refund transfer failed");

        emit RefundClaimed(msg.sender, amount);
    }

    // --- Governance ---
    
    function updateVerifier(address _newVerifier) external onlyVerifier {
        require(_newVerifier != address(0), "Invalid address");
        emit VerifierUpdated(verifier, _newVerifier);
        verifier = _newVerifier;
    }
}