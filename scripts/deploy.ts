import hre from "hardhat";
const { ethers } = hre;
import type { ClearFundFactory, CrowdfundEscrow } from "../typechain-types";
import fs from "fs";

async function main() {
  console.log("🚀 Starting ClearFund deployment to Sepolia...\n");

  const [deployer] = await ethers.getSigners();
  console.log("📍 Deploying contracts with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

  // ========================================
  // STEP 1: Deploy ClearFundFactory
  // ========================================
  console.log("📦 Deploying ClearFundFactory...");
  const ClearFundFactory = await ethers.getContractFactory("ClearFundFactory");
  const factory = await ClearFundFactory.deploy() as unknown as ClearFundFactory;
  await factory.waitForDeployment();
  
  const factoryAddress = await factory.getAddress();
  console.log("✅ ClearFundFactory deployed to:", factoryAddress);
  console.log("   Transaction hash:", factory.deploymentTransaction()?.hash);
  
  // Get platform admin (verifier) from factory
  const platformAdmin = await factory.platformAdmin();
  console.log("   Platform Admin (Verifier):", platformAdmin);
  console.log("");

  // ========================================
  // STEP 2: Create a Sample Campaign
  // ========================================
  console.log("🎯 Creating sample campaign via factory...");
  
  // Sample campaign parameters
  const title = "ClearFund Demo: Clean Water Initiative";
  const category = "Sustainability";
  const imageIPFS = "QmSampleHashForDemoImage123"; // Example IPFS hash
  const goalAmount = ethers.parseEther("10"); // 10 ETH goal
  const durationInDays = 30; // 30 days
  
  const milestoneDescriptions = [
    "Development Phase - Smart Contract & Backend",
    "Testing & Security Audit",
    "Frontend Development & UI/UX",
    "Marketing & Launch"
  ];
  
  const milestoneAmounts = [
    ethers.parseEther("3"),   // 3 ETH
    ethers.parseEther("2"),   // 2 ETH
    ethers.parseEther("3"),   // 3 ETH
    ethers.parseEther("2")    // 2 ETH
  ];

  console.log("   Campaign Details:");
  console.log("   - Title:", title);
  console.log("   - Category:", category);
  console.log("   - Creator:", deployer.address);
  console.log("   - Goal:", ethers.formatEther(goalAmount), "ETH");
  console.log("   - Duration:", durationInDays, "days");

  const tx = await factory.createCampaign(
    title,
    category,
    imageIPFS,
    goalAmount,
    durationInDays
  );

  const receipt = await tx.wait();
  console.log("   Transaction hash:", receipt?.hash);

  // Extract campaign address from event
  const campaignCreatedEvent = receipt?.logs.find(
    (log: any) => {
      try {
        const parsed = factory.interface.parseLog({
          topics: log.topics as string[],
          data: log.data
        });
        return parsed?.name === "CampaignCreated";
      } catch {
        return false;
      }
    }
  );

  let campaignAddress = "0x";
  if (campaignCreatedEvent) {
    const parsed = factory.interface.parseLog({
      topics: campaignCreatedEvent.topics as string[],
      data: campaignCreatedEvent.data
    });
    campaignAddress = parsed?.args[0];
  }

  console.log("✅ Sample Campaign deployed to:", campaignAddress);
  console.log("");

  // ========================================
  // STEP 3: Add Milestones to Campaign
  // ========================================
  console.log("📝 Adding milestones to campaign...");
  
  const CrowdfundEscrow = await ethers.getContractFactory("CrowdfundEscrow");
  const campaign = CrowdfundEscrow.attach(campaignAddress) as CrowdfundEscrow;

  // Add each milestone
  for (let i = 0; i < milestoneDescriptions.length; i++) {
    const milestoneTx = await campaign.addMilestone(
      milestoneDescriptions[i],
      milestoneAmounts[i]
    );
    await milestoneTx.wait();
    console.log(`   ✅ Milestone ${i}: ${milestoneDescriptions[i]} (${ethers.formatEther(milestoneAmounts[i])} ETH)`);
  }
  console.log("");

  // ========================================
  // STEP 4: Verify Campaign Details
  // ========================================
  console.log("🔍 Verifying campaign deployment...");

  const campaignCreator = await campaign.creator();
  const campaignVerifier = await campaign.verifier();
  const campaignGoal = await campaign.goal();
  const campaignDeadline = await campaign.deadline();
  const campaignState = await campaign.getCampaignState();

  console.log("   Campaign Info:");
  console.log("   - Creator:", campaignCreator);
  console.log("   - Verifier:", campaignVerifier);
  console.log("   - Goal:", ethers.formatEther(campaignGoal), "ETH");
  console.log("   - Deadline:", new Date(Number(campaignDeadline) * 1000).toLocaleString());
  console.log("   - State:", ["Active", "Successful", "Failed"][Number(campaignState)]);
  console.log("   - Total Milestones:", milestoneDescriptions.length);
  console.log("");

  console.log("=" .repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=" .repeat(60));
  console.log("");
  console.log("📋 CONTRACT ADDRESSES:");
  console.log("   ClearFundFactory:", factoryAddress);
  console.log("   Sample Campaign:  ", campaignAddress);
  console.log("");
  console.log("🔗 ETHERSCAN LINKS (Sepolia):");
  console.log("   Factory:  https://sepolia.etherscan.io/address/" + factoryAddress);
  console.log("   Campaign: https://sepolia.etherscan.io/address/" + campaignAddress);
  console.log("");
  console.log("💡 NEXT STEPS:");
  console.log("   1. Verify contracts on Etherscan (optional):");
  console.log("      npx hardhat verify --network sepolia " + factoryAddress);
  console.log("   2. Test donations:");
  console.log("      npx hardhat run scripts/test-donate.ts --network sepolia");
  console.log("   3. Save CAMPAIGN_ADDRESS to .env for testing:");
  console.log("      CAMPAIGN_ADDRESS=" + campaignAddress);
  console.log("");
  console.log("📁 ABI files generated at:");
  console.log("   ./artifacts/contracts/ClearFundFactory.sol/ClearFundFactory.json");
  console.log("   ./artifacts/contracts/CrowdfundEscrow.sol/CrowdfundEscrow.json");
  console.log("=" .repeat(60));

  // Save deployment info to file
  const deploymentInfo = {
    network: "sepolia",
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      ClearFundFactory: factoryAddress,
      SampleCampaign: campaignAddress
    },
    sampleCampaignDetails: {
      title: title,
      category: category,
      creator: campaignCreator,
      verifier: campaignVerifier,
      goalAmount: ethers.formatEther(campaignGoal) + " ETH",
      deadline: new Date(Number(campaignDeadline) * 1000).toISOString(),
      milestones: milestoneDescriptions.length
    }
  };

  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("✅ Deployment info saved to deployment-info.json\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
