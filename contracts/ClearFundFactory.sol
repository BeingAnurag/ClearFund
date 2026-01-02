// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CrowdfundEscrow.sol";

/**
 * @title ClearFundFactory
 * @dev Registry and generator for ClearFund campaigns.
 * Emits metadata events for The Graph/Indexers to build the frontend feed.
 */
contract ClearFundFactory {
    
    // --- State Variables ---
    CrowdfundEscrow[] public deployedCampaigns;
    address public platformAdmin; // The ClearFund official wallet (Verifier)

    // --- Events ---
    // Critical: This event contains the "Off-Chain" data (IPFS hashes, strings).
    // The Smart Contract doesn't store strings (too expensive), but emitting them 
    // lets your Frontend/Indexer find them easily.
    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator,
        string title,
        string category,
        string imageIPFS, // The hash of the image uploaded to Pinata
        uint256 goal,
        uint256 deadline
    );

    constructor() {
        platformAdmin = msg.sender;
    }

    /**
     * @dev Deploys a new CrowdfundEscrow contract.
     * @param _title Campaign title (for indexing)
     * @param _category Category like "Sustainability" or "Tech" (for filtering)
     * @param _imageIPFS The CID from Pinata/IPFS
     * @param _goal Funding target in Wei
     * @param _durationInDays How long the campaign lasts
     */
    function createCampaign(
        string memory _title,
        string memory _category,
        string memory _imageIPFS,
        uint256 _goal,
        uint256 _durationInDays
    ) external {
        
        // 1. Deploy the new Escrow Vault
        CrowdfundEscrow newCampaign = new CrowdfundEscrow(
            msg.sender,      // Creator (The user)
            platformAdmin,   // Verifier (ClearFund Admin)
            _goal,
            _durationInDays
        );

        // 2. Add to registry
        deployedCampaigns.push(newCampaign);

        // 3. Emit Event for Frontend/Indexer
        emit CampaignCreated(
            address(newCampaign),
            msg.sender,
            _title,
            _category,
            _imageIPFS,
            _goal,
            block.timestamp + (_durationInDays * 1 days)
        );
    }

    /**
     * @dev Helper to get all campaigns for the "Browse" page.
     * Note: Pagination should be handled by an Indexer (The Graph) in production,
     * but this works fine for < 500 campaigns.
     */
    function getDeployedCampaigns() external view returns (CrowdfundEscrow[] memory) {
        return deployedCampaigns;
    }
}