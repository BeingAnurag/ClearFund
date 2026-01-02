# ClearFund - Phase 1: Smart Contract Deployment Guide

Complete guide for deploying ClearFund contracts to Sepolia testnet using Hardhat.

---

## 📁 Project Structure

```
clearfund/
├── contracts/
│   ├── CrowdfundEscrow.sol      # Milestone-based escrow contract
│   └── ClearFundFactory.sol      # Factory for creating campaigns
├── scripts/
│   ├── deploy.ts                 # Main deployment script
│   ├── test-donate.ts            # Test donations
│   ├── test-approve-milestone.ts # Test milestone approval
│   ├── test-withdraw-milestone.ts # Test milestone withdrawal
│   └── test-refund.ts            # Test refund flow
├── test/                         # Unit tests (optional)
├── hardhat.config.ts             # Hardhat configuration
├── tsconfig.hardhat.json         # TypeScript config for Hardhat
├── .env.example                  # Environment template
└── package.json                  # Dependencies
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

This installs:
- Hardhat core
- Ethers.js v6
- Hardhat plugins (ethers, chai matchers, network helpers, etc.)

### 2. Configure Environment

Copy the example environment file:

```bash
copy .env.example .env
```

Edit `.env` and add your credentials:

```env
PRIVATE_KEY=your_private_key_without_0x_prefix
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**Where to get these:**
- **PRIVATE_KEY**: Export from MetaMask (Account Details > Export Private Key)
- **SEPOLIA_RPC_URL**: [Infura](https://infura.io) or [Alchemy](https://alchemy.com)
- **ETHERSCAN_API_KEY**: [Etherscan](https://etherscan.io/myapikey)

⚠️ **NEVER commit your `.env` file to git!**

### 3. Fund Your Wallet

Get Sepolia testnet ETH:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
- [Chainlink Sepolia Faucet](https://faucets.chain.link/sepolia)

You'll need ~0.1 ETH for deployment and testing.

---

## 🔨 Compilation

Compile the smart contracts:

```bash
npx hardhat compile
```

Expected output:
```
Compiled 2 Solidity files successfully
```

**Generated files:**
- `artifacts/contracts/ClearFundFactory.sol/ClearFundFactory.json` - Contains ABI and bytecode
- `artifacts/contracts/CrowdfundEscrow.sol/CrowdfundEscrow.json` - Contains ABI and bytecode

---

## 🚢 Deployment to Sepolia

### Deploy Factory + Sample Campaign

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

**What this script does:**
1. Deploys `ClearFundFactory` contract
2. Uses factory to create a sample campaign with:
   - Goal: 10 ETH
   - Duration: 30 days
   - 4 milestones (3 ETH, 2 ETH, 3 ETH, 2 ETH)
3. Verifies the campaign deployment
4. Saves addresses to `deployment-info.json`

**Expected output:**
```
🚀 Starting ClearFund deployment to Sepolia...

📍 Deploying contracts with account: 0x...
💰 Account balance: 0.5 ETH

📦 Deploying ClearFundFactory...
✅ ClearFundFactory deployed to: 0xABC...
   Transaction hash: 0x123...

🎯 Creating sample campaign via factory...
✅ Sample Campaign deployed to: 0xDEF...

🎉 DEPLOYMENT COMPLETE!

📋 CONTRACT ADDRESSES:
   ClearFundFactory: 0xABC...
   Sample Campaign:   0xDEF...
```

Save these addresses! You'll need them for testing and frontend integration.

---

## 📝 Contract ABIs for Frontend

After compilation, extract ABIs from the artifacts:

### ClearFundFactory ABI

```bash
# Windows PowerShell
Get-Content artifacts/contracts/ClearFundFactory.sol/ClearFundFactory.json | ConvertFrom-Json | Select-Object -ExpandProperty abi | ConvertTo-Json -Depth 10 > ClearFundFactory.abi.json
```

### CrowdfundEscrow ABI

```bash
# Windows PowerShell
Get-Content artifacts/contracts/CrowdfundEscrow.sol/CrowdfundEscrow.json | ConvertFrom-Json | Select-Object -ExpandProperty abi | ConvertTo-Json -Depth 10 > CrowdfundEscrow.abi.json
```

**Or manually:**
1. Open `artifacts/contracts/ClearFundFactory.sol/ClearFundFactory.json`
2. Copy the `"abi"` array
3. Save to your frontend project

**Important ABI Functions:**

**ClearFundFactory:**
- `createCampaign(address verifier, uint256 goalAmount, uint256 duration, string[] descriptions, uint256[] amounts)` → address
- `getCampaignCount()` → uint256
- `getAllCampaigns()` → address[]
- `getCampaignsByCreator(address creator)` → address[]

**CrowdfundEscrow:**
- `donate()` payable
- `approveMilestone(uint256 milestoneId)` (verifier only)
- `withdrawMilestone(uint256 milestoneId)` (creator only)
- `enableRefunds()` (after deadline if goal not met)
- `claimRefund()`
- `getMilestone(uint256 id)` → (amount, description, approved, withdrawn)
- `contributions(address donor)` → uint256

---

## 🧪 Manual Testing

### Set Campaign Address

After deployment, set the campaign address in `.env`:

```env
CAMPAIGN_ADDRESS=0xDEF...
```

### Test 1: Donate ETH

```bash
npx hardhat run scripts/test-donate.ts --network sepolia
```

This donates 0.1 ETH to the campaign. Run multiple times to reach the goal.

**Expected output:**
```
🎯 Testing Donation Flow

Campaign Address: 0xDEF...
Donor Address: 0x...

📊 Campaign Status (Before Donation):
   Goal: 10 ETH
   Raised: 0 ETH
   Goal Reached: false

💸 Donating 0.1 ETH...
   ✅ Transaction confirmed

📊 Campaign Status (After Donation):
   Total Raised: 0.1 ETH
   Your Contribution: 0.1 ETH
```

### Test 2: Approve Milestone (Verifier)

⚠️ **Must use verifier's private key in `.env`**

Set milestone ID (default is 0):
```env
MILESTONE_ID=0
```

Run approval:
```bash
npx hardhat run scripts/test-approve-milestone.ts --network sepolia
```

**Prerequisites:**
- Campaign goal must be reached
- Must be called by the verifier address

**Expected output:**
```
✅ Testing Milestone Approval

📊 Milestone Status (Before Approval):
   Amount: 3 ETH
   Description: Development Phase - Smart Contract & Backend
   Approved: false

🔐 Approving milestone...
   ✅ Transaction confirmed

📊 Milestone Status (After Approval):
   Approved: true
```

### Test 3: Withdraw Milestone (Creator)

⚠️ **Must use creator's private key in `.env`**

```bash
npx hardhat run scripts/test-withdraw-milestone.ts --network sepolia
```

**Prerequisites:**
- Milestone must be approved by verifier
- Must be called by the creator address

**Expected output:**
```
💰 Testing Milestone Withdrawal

📊 Milestone Status (Before Withdrawal):
   Amount: 3 ETH
   Approved: true
   Withdrawn: false

💸 Withdrawing milestone funds...
   ✅ Transaction confirmed

💰 Creator Balance (After): 1.5 ETH
   Net Gain: ~3 ETH (Less gas fees)
```

### Test 4: Refund Flow (Failed Campaign)

⚠️ **Only works if:**
- Deadline has passed
- Goal was NOT reached

Enable refunds and claim:
```bash
npx hardhat run scripts/test-refund.ts --network sepolia
```

**Expected output:**
```
🔄 Testing Refund Flow

📊 Campaign Status:
   Goal: 10 ETH
   Raised: 5 ETH
   Goal Reached: false
   Deadline: [past date]

🔓 Enabling refunds...
   ✅ Transaction confirmed

💸 Claiming refund of 0.5 ETH...
   ✅ Transaction confirmed

💰 User Balance (After): 0.75 ETH
   Net Gain: ~0.5 ETH (Less gas fees)
```

---

## 🔧 Hardhat Console Testing

For interactive testing, use the Hardhat console:

```bash
npx hardhat console --network sepolia
```

**Example commands:**

```javascript
// Get signers
const [signer] = await ethers.getSigners();
console.log("Address:", signer.address);

// Attach to factory
const factory = await ethers.getContractAt(
  "ClearFundFactory",
  "0xYOUR_FACTORY_ADDRESS"
);

// Get all campaigns
const campaigns = await factory.getAllCampaigns();
console.log("Campaigns:", campaigns);

// Attach to campaign
const campaign = await ethers.getContractAt(
  "CrowdfundEscrow",
  campaigns[0]
);

// Check campaign details
const goal = await campaign.goalAmount();
const raised = await campaign.totalRaised();
console.log("Goal:", ethers.formatEther(goal), "ETH");
console.log("Raised:", ethers.formatEther(raised), "ETH");

// Make a donation
const tx = await campaign.donate({ value: ethers.parseEther("0.1") });
await tx.wait();
console.log("Donated 0.1 ETH");

// Check milestone
const milestone = await campaign.getMilestone(0);
console.log("Milestone 0:", {
  amount: ethers.formatEther(milestone[0]),
  description: milestone[1],
  approved: milestone[2],
  withdrawn: milestone[3]
});
```

---

## ✅ Contract Verification (Optional)

Verify on Etherscan for public transparency:

```bash
# Verify Factory
npx hardhat verify --network sepolia YOUR_FACTORY_ADDRESS

# Verify Campaign (with constructor args)
npx hardhat verify --network sepolia YOUR_CAMPAIGN_ADDRESS \
  "CREATOR_ADDRESS" \
  "VERIFIER_ADDRESS" \
  "10000000000000000000" \
  "2592000" \
  '["Milestone 1","Milestone 2"]' \
  '["5000000000000000000","5000000000000000000"]'
```

---

## 📊 Testing Checklist

- [ ] Deploy factory and campaign
- [ ] Donate ETH (single donor)
- [ ] Donate ETH (multiple donors)
- [ ] Reach campaign goal
- [ ] Approve milestone as verifier
- [ ] Withdraw milestone as creator
- [ ] Create failed campaign (don't reach goal)
- [ ] Wait for deadline to pass
- [ ] Enable refunds
- [ ] Claim refunds

---

## 🔍 Troubleshooting

### "Insufficient funds for intrinsic transaction cost"
- Get more Sepolia ETH from faucets
- Check your balance: `await ethers.provider.getBalance("YOUR_ADDRESS")`

### "Only creator" / "Only verifier" errors
- Make sure you're using the correct private key in `.env`
- Verify addresses match: `await campaign.creator()` or `await campaign.verifier()`

### "Goal not reached"
- Donate more ETH until `totalRaised >= goalAmount`
- Check status: `await campaign.goalReached()`

### "Deadline not passed"
- For testing, create campaigns with shorter durations (e.g., 60 seconds)
- Or use Hardhat's time manipulation in local tests

### "Nonce too low" errors
- Wait for previous transaction to confirm
- Or manually set nonce: `{ nonce: await ethers.provider.getTransactionCount(signer.address) }`

---

## 📦 Next Steps (Phase 2+)

After successful deployment:

1. **Frontend Integration:**
   - Copy ABI files to your React app
   - Use `wagmi` or `ethers.js` to connect
   - Display campaigns, accept donations, show progress

2. **Subgraph/Indexing:**
   - Index `CampaignCreated`, `Donated`, `MilestoneApproved` events
   - Build campaign search and filtering

3. **IPFS Integration:**
   - Store campaign metadata (images, descriptions)
   - Reference IPFS hashes in contract or off-chain DB

4. **Supabase Backend:**
   - Store campaign details
   - Cache blockchain data for faster queries
   - User profiles and social features

---

## 📚 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js v6 Documentation](https://docs.ethers.org/v6/)
- [Sepolia Testnet](https://sepolia.dev/)
- [Solidity Documentation](https://docs.soliditylang.org/)

---

## 🎯 Quick Command Reference

```bash
# Setup
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
copy .env.example .env

# Compile
npx hardhat compile

# Deploy
npx hardhat run scripts/deploy.ts --network sepolia

# Test Scripts
npx hardhat run scripts/test-donate.ts --network sepolia
npx hardhat run scripts/test-approve-milestone.ts --network sepolia
npx hardhat run scripts/test-withdraw-milestone.ts --network sepolia
npx hardhat run scripts/test-refund.ts --network sepolia

# Interactive Console
npx hardhat console --network sepolia

# Verify Contracts
npx hardhat verify --network sepolia ADDRESS [CONSTRUCTOR_ARGS...]
```

---

**Phase 1 Complete! 🎉**

Your contracts are now deployed and tested on Sepolia testnet. You have working ABIs ready for frontend integration.
