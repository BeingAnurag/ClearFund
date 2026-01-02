import hre from "hardhat";
const { ethers } = hre;
import type { CrowdfundEscrow } from "../typechain-types";

/**
 * Test Script: Withdraw Milestone Funds
 * 
 * This script demonstrates milestone withdrawal by creator
 * Run: npx hardhat run scripts/test-withdraw-milestone.ts --network sepolia
 * 
 * NOTE: Must be run with creator's private key in .env
 * REQUIREMENT: Campaign must be in Successful state (deadline passed + goal met)
 */

async function main() {
  const CAMPAIGN_ADDRESS = process.env.CAMPAIGN_ADDRESS || "";
  const MILESTONE_ID = process.env.MILESTONE_ID || "0";
  
  if (!CAMPAIGN_ADDRESS) {
    console.error("❌ Error: Please set CAMPAIGN_ADDRESS in .env file");
    process.exit(1);
  }

  console.log("💰 Testing Milestone Withdrawal\n");
  console.log("Campaign Address:", CAMPAIGN_ADDRESS);
  console.log("Milestone ID:", MILESTONE_ID);
  
  const [creator] = await ethers.getSigners();
  console.log("Creator Address:", creator.address);
  
  const balanceBefore = await ethers.provider.getBalance(creator.address);
  console.log("Creator Balance (Before):", ethers.formatEther(balanceBefore), "ETH");
  console.log("");

  // Attach to campaign contract
  const CrowdfundEscrow = await ethers.getContractFactory("CrowdfundEscrow");
  const campaign = CrowdfundEscrow.attach(CAMPAIGN_ADDRESS) as CrowdfundEscrow;

  // Verify this is the creator
  const expectedCreator = await campaign.creator();
  if (expectedCreator.toLowerCase() !== creator.address.toLowerCase()) {
    console.error("❌ Error: Current signer is not the campaign creator");
    console.error("   Expected:", expectedCreator);
    console.error("   Got:", creator.address);
    process.exit(1);
  }

  // Check campaign state
  const campaignState = await campaign.getCampaignState();
  console.log("📊 Campaign State:", ["Active", "Successful", "Failed"][Number(campaignState)]);
  
  if (Number(campaignState) !== 1) { // 1 = Successful
    console.error("❌ Error: Campaign must be in Successful state to withdraw");
    console.error("   Current state:", ["Active", "Successful", "Failed"][Number(campaignState)]);
    
    const deadline = await campaign.deadline();
    const goal = await campaign.goal();
    const totalRaised = await campaign.totalRaised();
    
    console.error("   Deadline:", new Date(Number(deadline) * 1000).toLocaleString());
    console.error("   Goal:", ethers.formatEther(goal), "ETH");
    console.error("   Raised:", ethers.formatEther(totalRaised), "ETH");
    process.exit(1);
  }

  // Get milestone details before withdrawal
  console.log("📊 Milestone Status (Before Withdrawal):");
  const milestone = await campaign.milestones(MILESTONE_ID);
  console.log("   Description:", milestone.description);
  console.log("   Amount:", ethers.formatEther(milestone.amount), "ETH");
  console.log("   Approved:", milestone.isApproved);
  console.log("   Withdrawn:", milestone.isWithdrawn);
  console.log("");

  if (!milestone.isApproved) {
    console.error("❌ Error: Milestone not approved yet");
    process.exit(1);
  }

  if (milestone.isWithdrawn) {
    console.log("⚠️  Milestone already withdrawn");
    process.exit(0);
  }

  // Withdraw milestone
  console.log("💸 Withdrawing milestone funds...");
  const tx = await campaign.withdrawMilestone(MILESTONE_ID);
  console.log("   Transaction submitted:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("   ✅ Transaction confirmed in block:", receipt?.blockNumber);
  console.log("");

  // Check milestone status after withdrawal
  console.log("📊 Milestone Status (After Withdrawal):");
  const updatedMilestone = await campaign.milestones(MILESTONE_ID);
  console.log("   Withdrawn:", updatedMilestone.isWithdrawn);
  console.log("");

  // Check creator balance after withdrawal
  const balanceAfter = await ethers.provider.getBalance(creator.address);
  console.log("💰 Creator Balance (After):", ethers.formatEther(balanceAfter), "ETH");
  
  const netGain = balanceAfter - balanceBefore;
  console.log("   Net Gain:", ethers.formatEther(netGain), "ETH");
  console.log("   (Less gas fees)");
  console.log("");

  console.log("✅ Milestone withdrawal test completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:");
    console.error(error);
    process.exit(1);
  });
