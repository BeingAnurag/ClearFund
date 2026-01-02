import hre from "hardhat";
const { ethers } = hre;
import type { CrowdfundEscrow } from "../typechain-types";

/**
 * Test Script: Donate ETH to Campaign
 * 
 * This script demonstrates donating ETH to a deployed campaign
 * Run: npx hardhat run scripts/test-donate.ts --network sepolia
 */

async function main() {
  const CAMPAIGN_ADDRESS = process.env.CAMPAIGN_ADDRESS || "";
  
  if (!CAMPAIGN_ADDRESS) {
    console.error("❌ Error: Please set CAMPAIGN_ADDRESS in .env file");
    process.exit(1);
  }

  console.log("🎯 Testing Donation Flow\n");
  console.log("Campaign Address:", CAMPAIGN_ADDRESS);
  
  const [donor] = await ethers.getSigners();
  console.log("Donor Address:", donor.address);
  
  const balance = await ethers.provider.getBalance(donor.address);
  console.log("Donor Balance:", ethers.formatEther(balance), "ETH\n");

  // Attach to campaign contract
  const CrowdfundEscrow = await ethers.getContractFactory("CrowdfundEscrow");
  const campaign = CrowdfundEscrow.attach(CAMPAIGN_ADDRESS) as CrowdfundEscrow;

  // Check campaign details before donation
  console.log("📊 Campaign Status (Before Donation):");
  const goal = await campaign.goal();
  const totalRaised = await campaign.totalRaised();
  const campaignState = await campaign.getCampaignState();
  const deadline = await campaign.deadline();
  
  console.log("   Goal:", ethers.formatEther(goal), "ETH");
  console.log("   Raised:", ethers.formatEther(totalRaised), "ETH");
  console.log("   State:", ["Active", "Successful", "Failed"][Number(campaignState)]);
  console.log("   Deadline:", new Date(Number(deadline) * 1000).toLocaleString());
  console.log("");

  // Check if campaign is active
  if (Number(campaignState) !== 0) { // 0 = Active
    console.error("❌ Error: Campaign is not active");
    console.error("   Current state:", ["Active", "Successful", "Failed"][Number(campaignState)]);
    process.exit(1);
  }

  // Make donation
  const donationAmount = ethers.parseEther("0.01"); // 0.01 ETH
  console.log("💸 Contributing", ethers.formatEther(donationAmount), "ETH...");
  
  const tx = await campaign.contribute({ value: donationAmount });
  console.log("   Transaction submitted:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("   ✅ Transaction confirmed in block:", receipt?.blockNumber);
  console.log("");

  // Check campaign status after donation
  console.log("📊 Campaign Status (After Donation):");
  const newTotalRaised = await campaign.totalRaised();
  const newCampaignState = await campaign.getCampaignState();
  const myContribution = await campaign.contributions(donor.address);
  
  console.log("   Total Raised:", ethers.formatEther(newTotalRaised), "ETH");
  console.log("   State:", ["Active", "Successful", "Failed"][Number(newCampaignState)]);
  console.log("   Your Contribution:", ethers.formatEther(myContribution), "ETH");
  console.log("");

  console.log("✅ Donation test completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:");
    console.error(error);
    process.exit(1);
  });
