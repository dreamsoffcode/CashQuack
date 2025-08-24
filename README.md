# 💸 CashQuack

CashQuack is a MERN-stack based wallet application inspired by Paytm. It enables users to register, authenticate, and perform secure money transfers between wallets with real-time balance updates.

## ✨ Features

- 🔑 **Secure Authentication** – JWT-based login & registration
- 💰 **Wallet System** – Each user gets a unique wallet with balance tracking
- ⚡ **Instant Transfers** – Wallet-to-wallet money transfers
- 🔒 **Transaction Safety** – Atomic updates with Mongoose for concurrency handling
- 👤 **Profile Management** – Manage user details and wallet info

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Validation:** Zod  
- **Authentication:** JWT  

## 🚀 Getting Started

### Prerequisites
- Node.js & npm installed
- MongoDB running locally or on cloud (MongoDB Atlas)

### Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/dreamsoffcode/CashQuack.git
   cd CashQuack
   ```

2. Install dependencies for both frontend and backend  
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Create a `.env` file in the backend folder with the following:  
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. Run backend server  
   ```bash
   cd backend
   npm start
   ```

5. Run frontend  
   ```bash
   cd frontend
   npm start
   ```

## 📂 Project Structure

```
CashQuack/
│── backend/         # Express.js backend
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   └── controllers/ # Business logic
│
│── frontend/        # React.js frontend
│   ├── components/  # Reusable UI components
│   └── pages/       # Main pages
│
└── README.md
```

## 🌟 Future Enhancements
- 📱 Mobile app support
- 📊 Transaction history & analytics
- 🔔 Notifications for transfers
- 💳 Integration with real payment gateways

---

Made with ❤️ by [Akash Anand](https://github.com/dreamsoffcode)
