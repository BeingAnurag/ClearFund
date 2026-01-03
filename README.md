# ClearFund

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A trust-first, Web3-enabled crowdfunding platform focused on **verification, transparency, and accountability**.  
ClearFund combines modern frontend architecture with blockchain primitives to ensure every contribution is traceable and auditable.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **wagmi**, with an Express backend and Supabase integration.

---

## Live Demo

[View Live Demo](https://clear-fund-website.vercel.app)

## Preview

| Hero Section | Campaign Details |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/11dbdb2d-c227-4b6a-87e5-194c129fa625" width="100%" alt="Hero Section"> | <img src="https://github.com/user-attachments/assets/1e6ed80f-9c9d-4dee-b401-b0a7f6838f2c" width="100%" alt="Campaign Details"> |

| Transparency Feed | Trust Features |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/38198334-b018-4325-b491-9aee89876f57" width="100%" alt="Transparency Feed"> | <img src="https://github.com/user-attachments/assets/5d6315ae-882e-470c-abf1-75fce0fe440e" width="100%" alt="Trust Features"> |

---

## Key Features

- **Verified Crowdfunding** – Campaign creators are verified via identity-backed workflows.
- **Wallet-Based Donations** – Secure wallet connections using wagmi + viem.
- **Live Transparency Feed** – Real-time donation and verification activity.
- **Campaign Spotlight** – Featured, trending, and verified campaigns.
- **Milestone-Based Funding** – Funds released only after validation.
- **Dark, Institutional UI** – Trust-first design with minimal motion.
- **Fully Responsive** – Desktop-first, mobile-friendly layout.
- **Vercel Ready** – Optimized for production deployment.

---

## Architecture Overview

ClearFund follows a modular, scalable architecture:

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: wagmi + viem
- **State**: React hooks + server components

### Backend
- **Server**: Express.js (Node.js)
- **Purpose**: Campaign data, donation records, verification logic
- **Design**: REST-based, extensible for smart contract integration

### Database
- **Supabase** (PostgreSQL)
  - Users
  - Campaigns
  - Donations
  - Verification metadata

### Storage
- **IPFS (Pinata)** – Campaign metadata & proofs (stubbed integration)

---

## Project Structure

```
clearfund/
├── contracts/                  # Solidity smart contracts
│   ├── ClearFundFactory.sol    # Campaign factory and registry
│   └── CrowdfundEscrow.sol     # Campaign escrow vault
├── scripts/                    # Hardhat deployment and test scripts
├── src/
│   ├── app/                    # Next.js App Router (campaigns, pages)
│   ├── components/             # React UI components
│   ├── lib/                    # Utilities, contracts.tsx (ABIs/addresses)
│   ├── data/                   # Mock campaign data
│   └── styles/                 # Global CSS
├── server/                     # Express API server
├── deployment-info.json        # Contract addresses from last deploy
├── hardhat.config.ts           # Hardhat configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm)
- Sepolia testnet ETH for deployment
- `.env.local` with `NEXT_PUBLIC_WALLETCONNECT_ID`, `HARDHAT_PRIVATE_KEY`, `SEPOLIA_RPC_URL`

### Quick Start
```bash
git clone https://github.com/your-org/clearfund.git
cd clearfund
pnpm install
cp .env.example .env.local    # Configure environment variables
pnpm dev                       # Start dev server (http://localhost:3000)
```

## Smart Contracts

Two contracts on Sepolia:

- **ClearFundFactory**: Creates individual campaign escrows, emits metadata events
- **CrowdfundEscrow**: All-or-nothing vault with milestone-based releases, refunds on failure

Deploy contracts:
```bash
pnpm hardhat:compile
pnpm hardhat:deploy          # Outputs factory address
pnpm hardhat:test            # Run test suite
```

Update `src/lib/contracts.tsx` with deployed addresses.

## Running the Application

```bash
pnpm dev               # Development (hot reload)
pnpm build             # Production build
pnpm start             # Run production build
pnpm lint              # ESLint check
```

## Architecture

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, wagmi + viem |
| Smart Contracts | Solidity 0.8.19, Hardhat, TypeChain |
| Wallet | WalletConnect v2 (MetaMask, etc.) |
| Network | Sepolia testnet |

**Data Flow**:
1. Creator deploys campaign via factory
2. Factory emits `CampaignCreated` event with metadata
3. Frontend reads live escrow state (raised, goal, deadline)
4. Donors interact directly with escrow contracts
5. Verifier (admin) approves milestones for fund release

## Security

- **Reentrancy Guard**: Manual guard in `CrowdfundEscrow` on withdrawals
- **Access Control**: Creator and verifier roles strictly enforced
- **All-or-Nothing**: Funds locked in escrow; automatic refunds on failure
- **Milestone Approval**: Verifier must approve before creator withdrawal
- **Self-Contained**: No external calls; minimizes attack surface

Before mainnet: conduct smart contract audit, use verified deployer key, limit verifier permissions.

## License

MIT
