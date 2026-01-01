# ClearFund

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A trust-first, Web3-enabled crowdfunding platform focused on **verification, transparency, and accountability**.  
ClearFund combines modern frontend architecture with blockchain primitives to ensure every contribution is traceable and auditable.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **wagmi**, with an Express backend and Supabase integration.

---

## 🌐 Live Demo

🔗 [View Live Demo](https://clear-fund-website.vercel.app)

## 🖼 Preview

| Hero Section | Campaign Details |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/11dbdb2d-c227-4b6a-87e5-194c129fa625" width="100%" alt="Hero Section"> | <img src="https://github.com/user-attachments/assets/1e6ed80f-9c9d-4dee-b401-b0a7f6838f2c" width="100%" alt="Campaign Details"> |

| Transparency Feed | Trust Features |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/38198334-b018-4325-b491-9aee89876f57" width="100%" alt="Transparency Feed"> | <img src="https://github.com/user-attachments/assets/5d6315ae-882e-470c-abf1-75fce0fe440e" width="100%" alt="Trust Features"> |

---

## ✨ Key Features

- **Verified Crowdfunding** – Campaign creators are verified via identity-backed workflows.
- **Wallet-Based Donations** – Secure wallet connections using wagmi + viem.
- **Live Transparency Feed** – Real-time donation and verification activity.
- **Campaign Spotlight** – Featured, trending, and verified campaigns.
- **Milestone-Based Funding** – Funds released only after validation.
- **Dark, Institutional UI** – Trust-first design with minimal motion.
- **Fully Responsive** – Desktop-first, mobile-friendly layout.
- **Vercel Ready** – Optimized for production deployment.

---

## 🧱 Architecture Overview

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

## 📁 Project Structure

```bash
clearfund/
├── server/              # Express backend
│   └── index.js
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/      # UI components
│   │   ├── hero/
│   │   ├── campaign/
│   │   ├── trust/
│   │   ├── cta/
│   │   └── layout/
│   ├── lib/             # Utilities & Web3 config
│   └── styles/
│       └── globals.css
├── public/              # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
