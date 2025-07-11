# 💰 FinanseApp — Personal Finance Tracker (Full-stack + Docker)

A full-stack finance management and analytics dashboard. It supports user authentication, financial operations tracking, interactive charts, Dockerized infrastructure, and a polished Material UI frontend.

## ✨ Features

- 🔐 User authentication (JWT)
- 💸 Add/edit/delete income & expenses
- 📊 Visual analytics using Recharts
- 📈 Trend prediction using regression
- 💾 Persistent MongoDB data
- 🧱 Fully dockerized for deployment

## 📁 Structure

```
FinanseApp/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── charts/
│   └── vite.config.ts
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/
├── docker-compose.yml
└── .env
```

## ⚙️ Installation

```bash
cd client && npm install
cd ../server && npm install

cd server && npm run dev
cd ../client && npm run dev
```

`.env` backend:

```
PORT=5000
MONGO_URI=...
JWT_SECRET=...
```

---
