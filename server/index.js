const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const campaigns = [
  {
    id: 1,
    title: "Ocean Cleanup: Phase 4",
    description: "Deploying autonomous cleaning arrays in the Great Pacific Garbage Patch.",
    raised: 1250000,
    target: 2000000,
    donors: 3420,
    verified: true,
  },
  {
    id: 2,
    title: "Decentralized Science Hub",
    description: "Open source research facility for bio-hacking and longevity.",
    raised: 45000,
    target: 50000,
    donors: 120,
    verified: true,
  }
];

app.get('/api/campaigns', (req, res) => {
  res.json(campaigns);
});

app.listen(port, () => {
  console.log(`✅ API running on http://localhost:${port}`);
});