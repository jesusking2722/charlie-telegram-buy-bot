# 🤖 CHRLE Token Presale Telegram Bot

![Telegram](https://img.shields.io/badge/Telegram-Bot-blue?logo=telegram)  
📌 **Automated transaction management bot for the $CHRLE token presale across multiple blockchain networks.**

---

## 🌟 Overview

This Telegram bot is designed to streamline the presale process of the **$CHRLE token**, allowing users to manage their transactions seamlessly. The bot interacts with multiple blockchain networks to verify and log token purchases and sends updates to an official public Telegram group.

### 🔗 Supported Blockchains:

✅ Ethereum (ETH)  
✅ Polygon (POL)  
✅ Base (BASE)  
✅ Binance Smart Chain (BNB)  
✅ Solana (SOL)  
✅ TON (TON)

---

## 🚀 Features

- `/buy` command to process token purchases
- Automated transaction verification
- Broadcasts transaction updates to a public Telegram group
- Secure API handling for blockchain interactions

---

## 🏗️ Project Structure

```
📂 CHRLE-Telegram-Bot
├── 📜 index.js # Main bot logic
├── 📜 .env # Environment variables
├── 📂 contracts # Blockchain contract interactions
│ ├── 📜 abis.js # ABI definitions
│ ├── 📜 networks.js # Network configurations
├── 📂 helper # Utility functions
│ ├── 📜 index.js # Helper methods
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/CHRLE-Telegram-Bot.git
cd CHRLE-Telegram-Bot
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Configure Environment Variables

Create a .env file in the root directory and set up your API keys:

```
BOT_TOKEN=your_telegram_bot_token
GROUP_ID=your_public_group_id
ETH_RPC_URL=your_eth_rpc_url
POL_RPC_URL=your_pol_rpc_url
BASE_RPC_URL=your_base_rpc_url
BNB_RPC_URL=your_bnb_rpc_url
SOL_RPC_URL=your_sol_rpc_url
TON_RPC_URL=your_ton_rpc_url
```

### 4️⃣ Run the Bot

```
node index.js
```

---

## 🛠️ Technologies Used

- Node.js - Backend runtime
- Telegram Bot API - Communication with Telegram
- Web3.js & ethers.js - Blockchain interaction
- Solana Web3 - Solana integration
- TON SDK - TON blockchain support
- dotenv - Environment variable management

---

## 🔗 Future Enhancements

- ✔️ Multi-language support
- ✔️ User-friendly dashboard
- ✔️ Transaction history tracking

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Commit changes (git commit -m 'Added new feature')
4. Push the branch (git push origin feature-branch)
5. Open a pull request

---

## 📞 Support

If you encounter any issues, feel free to reach out:

- 📩 Email: team@charlieunicornai.eu
- 💬 Telegram Group: [CharlieunicornaiOfficial](https://t.me/CharlieUnicornaiOfficial)
