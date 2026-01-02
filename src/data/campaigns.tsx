// src/data/campaigns.tsx

export type CategoryType = 'Verified' | 'Trending' | 'Ending Soon';

export interface Milestone {
  id: number;
  title: string;
  amount: string;
  status: 'Released' | 'Locked' | 'Pending';
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  raised: number;
  target: number;
  donors: number;
  daysLeft: number;
  image: string;
  category: string;
  verified: boolean;
  status: 'Active' | 'Funded' | 'Ended';
  creatorWallet: string;
  contractAddress: string;
  milestones: Milestone[];
}

const CAMPAIGN_1: Campaign = {
  id: '1',
  title: "Ocean Cleanup: Phase 4",
  description: "Deploying autonomous cleaning arrays in the Great Pacific Garbage Patch with verifiable impact tracking. This phase focuses on hardware deployment and satellite monitoring integration.",
  raised: 1250000,
  target: 2000000,
  donors: 3420,
  daysLeft: 12,
  image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80",
  category: "Sustainability",
  verified: true,
  status: 'Active',
  creatorWallet: "0x71C...9A21",
  contractAddress: "0x892...3b1a",
  milestones: [
    { id: 1, title: "Hardware Procurement", amount: "500,000", status: "Released" },
    { id: 2, title: "Deployment Logistics", amount: "750,000", status: "Pending" },
    { id: 3, title: "Operational Launch", amount: "750,000", status: "Locked" },
  ]
};

const CAMPAIGN_2: Campaign = {
  id: '2',
  title: "DeSci: Longevity Research DAO",
  description: "Crowdsourcing clinical trials for age-reversal therapies. Governance tokens issued to all contributors for IP rights voting.",
  raised: 850000,
  target: 500000,
  donors: 8900,
  daysLeft: 45,
  image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80",
  category: "Research",
  verified: true,
  status: 'Active',
  creatorWallet: "0x3dA...2c99",
  contractAddress: "0x4f1...9e2d",
  milestones: [
    { id: 1, title: "Lab Setup", amount: "200,000", status: "Released" },
    { id: 2, title: "Clinical Trials", amount: "300,000", status: "Locked" },
  ]
};

const CAMPAIGN_3: Campaign = {
  id: '3',
  title: "Urban Vertical Farming Grid",
  description: "Installing hydroponic modules in 50 inner-city rooftops. Final funding round to secure logistics contracts before winter.",
  raised: 180000,
  target: 200000,
  donors: 450,
  daysLeft: 2,
  image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80",
  category: "Infrastructure",
  verified: false,
  status: 'Active',
  creatorWallet: "0x9b2...11aa",
  contractAddress: "0x1c9...33ff",
  milestones: [
    { id: 1, title: "Module Fabrication", amount: "100,000", status: "Released" },
    { id: 2, title: "Installation", amount: "100,000", status: "Locked" },
  ]
};

const CAMPAIGN_4: Campaign = {
  id: '4',
  title: "Ethereum Edu-Node Network",
  description: "Setting up lightweight nodes in developing regions to support network health and education.",
  raised: 150000,
  target: 150000,
  donors: 890,
  daysLeft: 0,
  image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80",
  category: "Technology",
  verified: true,
  status: 'Funded',
  creatorWallet: "0x22a...cc11",
  contractAddress: "0x77b...00aa",
  milestones: [
    { id: 1, title: "Full Allocation", amount: "150,000", status: "Released" },
  ]
};

export const SPOTLIGHT_DATA: Record<CategoryType, Campaign> = {
  'Verified': CAMPAIGN_1,
  'Trending': CAMPAIGN_2,
  'Ending Soon': CAMPAIGN_3
};

export const ALL_CAMPAIGNS: Campaign[] = [
  CAMPAIGN_1, CAMPAIGN_2, CAMPAIGN_3, CAMPAIGN_4
];