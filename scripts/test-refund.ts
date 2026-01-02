import hre from "hardhat";
const { ethers } = hre;
import type { CrowdfundEscrow } from "../typechain-types";

/**
 * Test Script: Claim Refund
 * 
 * This script demonstrates the refund process when goal is not met
 * Run: npx hardhat run scripts/test-refund.ts --network sepolia
 * 
 * NOTE: Campaign must be in Failed state (deadline passed + goal not met)
 */

async function main() {
  const CAMPAIGN_ADDRESS = process.env.CAMPAIGN_ADDRESS || "";
  
  if (!CAMPAIGN_ADDRESS) {
    console.error("❌ Error: Please set CAMPAIGN_ADDRESS in .env file");
    process.exit(1);
  }

  console.log("🔄 Testing Refund Flow\n");
  console.log("Campaign Address:", CAMPAIGN_ADDRESS);
  
  const [user] = await ethers.getSigners();
  console.log("User Address:", user.address);
  
  const balanceBefore = await ethers.provider.getBalance(user.address);
  console.log("User Balance (Before):", ethers.formatEther(balanceBefore), "ETH");
  console.log("");

  // Attach to campaign contract
  const CrowdfundEscrow = await ethers.getContractFactory("CrowdfundEscrow");
  const campaign = CrowdfundEscrow.attach(CAMPAIGN_ADDRESS) as CrowdfundEscrow;

  // Check campaign status
  console.log("📊 Campaign Status:");
  const goal = await campaign.goal();
  const totalRaised = await campaign.totalRaised();
  const campaignState = await campaign.getCampaignState();
  const deadline = await campaign.deadline();
  const myContribution = await campaign.contributions(user.address);
  
  console.log("   Goal:", ethers.formatEther(goal), "ETH");
  console.log("   Raised:", ethers.formatEther(totalRaised), "ETH");
  console.log("   State:", ["Active", "Successful", "Failed"][Number(campaignState)]);
  console.log("   Deadline:", new Date(Number(deadline) * 1000).toLocaleString());
  console.log("   Your Contribution:", ethers.formatEther(myContribution), "ETH");
  console.log("");

  // Check if campaign is in Failed state
  if (Number(campaignState) !== 2) { // 2 = Failed
    console.error("❌ Error: Campaign must be in Failed state for refunds");
    console.error("   Current state:", ["Active", "Successful", "Failed"][Number(campaignState)]);
    
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < Number(deadline)) {
      console.error("   Deadline has not passed yet");
      console.error("   Current time:", new Date(currentTime * 1000).toLocaleString());
    }
    if (totalRaised >= goal) {
      console.error("   Goal was reached, refunds not available");
    }
    process.exit(1);
  }

  // Check contribution
  if (myContribution === BigInt(0)) {
    console.log("⚠️  You have no contribution to refund");
    process.exit(0);
  }

  // Claim refund
  console.log("💸 Claiming refund of", ethers.formatEther(myContribution), "ETH...");
  const refundTx = await campaign.claimRefund();
  console.log("   Transaction submitted:", refundTx.hash);
  
  const refundReceipt = await refundTx.wait();
  console.log("   ✅ Transaction confirmed in block:", refundReceipt?.blockNumber);
  console.log("");

  // Check user balance after refund
  const balanceAfter = await ethers.provider.getBalance(user.address);
  console.log("💰 User Balance (After):", ethers.formatEther(balanceAfter), "ETH");
  
  const netGain = balanceAfter - balanceBefore;
  console.log("   Net Gain:", ethers.formatEther(netGain), "ETH");
  console.log("   (Less gas fees)");
  console.log("");

  // Verify contribution is now zero
  const updatedContribution = await campaign.contributions(user.address);
  console.log("📊 Updated Contribution:", ethers.formatEther(updatedContribution), "ETH");
  console.log("");

  console.log("✅ Refund test completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:");
    console.error(error);
    process.exit(1);
  });
