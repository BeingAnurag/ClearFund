import hre from "hardhat";
const { ethers } = hre;
import type { CrowdfundEscrow } from "../typechain-types";

/**
 * Test Script: Approve Milestone
 * 
 * This script demonstrates milestone approval by verifier
 * Run: npx hardhat run scripts/test-approve-milestone.ts --network sepolia
 * 
 * NOTE: Must be run with verifier's private key in .env
 */

async function main() {
  const CAMPAIGN_ADDRESS = process.env.CAMPAIGN_ADDRESS || "";
  const MILESTONE_ID = process.env.MILESTONE_ID || "0";
  
  if (!CAMPAIGN_ADDRESS) {
    console.error("❌ Error: Please set CAMPAIGN_ADDRESS in .env file");
    process.exit(1);
  }

  console.log("✅ Testing Milestone Approval\n");
  console.log("Campaign Address:", CAMPAIGN_ADDRESS);
  console.log("Milestone ID:", MILESTONE_ID);
  
  const [verifier] = await ethers.getSigners();
  console.log("Verifier Address:", verifier.address);
  console.log("");

  // Attach to campaign contract
  const CrowdfundEscrow = await ethers.getContractFactory("CrowdfundEscrow");
  const campaign = CrowdfundEscrow.attach(CAMPAIGN_ADDRESS) as CrowdfundEscrow;

  // Verify this is the verifier
  const expectedVerifier = await campaign.verifier();
  if (expectedVerifier.toLowerCase() !== verifier.address.toLowerCase()) {
    console.error("❌ Error: Current signer is not the campaign verifier");
    console.error("   Expected:", expectedVerifier);
    console.error("   Got:", verifier.address);
    process.exit(1);
  }

  // Get milestone details before approval
  console.log("📊 Milestone Status (Before Approval):");
  const milestone = await campaign.milestones(MILESTONE_ID);
  console.log("   Description:", milestone.description);
  console.log("   Amount:", ethers.formatEther(milestone.amount), "ETH");
  console.log("   Approved:", milestone.isApproved);
  console.log("   Withdrawn:", milestone.isWithdrawn);
  console.log("");

  if (milestone.isApproved) {
    console.log("⚠️  Milestone already approved");
    process.exit(0);
  }

  // Approve milestone
  console.log("🔐 Approving milestone...");
  const tx = await campaign.approveMilestone(MILESTONE_ID);
  console.log("   Transaction submitted:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("   ✅ Transaction confirmed in block:", receipt?.blockNumber);
  console.log("");

  // Check milestone status after approval
  console.log("📊 Milestone Status (After Approval):");
  const updatedMilestone = await campaign.milestones(MILESTONE_ID);
  console.log("   Approved:", updatedMilestone.isApproved);
  console.log("");

  console.log("✅ Milestone approval test completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:");
    console.error(error);
    process.exit(1);
  });
