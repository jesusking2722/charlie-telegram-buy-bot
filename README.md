# Charlie Telegram Buy Bot 🤖💰

Welcome to the **Charlie Telegram Buy Bot**! 🚀 This bot is designed to send real-time alerts to our official **Telegram group** whenever a user buys **$CHRLE tokens** on our presale website. The bot notifies the group with the latest transaction details, including token price, amount bought, and much more.

The bot also allows users to quickly buy $CHRLE tokens through a "Buy $CHRLE" button that redirects to our presale website.

---

## 🛠️ Features

- **Buy Transaction Alerts** 📢: Notifies the Telegram group when someone purchases $CHRLE tokens, with details like:
  - The amount of $CHRLE bought 💸
  - The price of the tokens in USD 💵
  - A small video related to the purchase 🎥
- **Presale Stats** 📊:

  - Displays **total sold tokens** 🏆
  - **Total sold token price** in USD 💵
  - **Current token price** 🏷️
  - **Next token price** 📈
  - **Current token holders count** 👥

- **Presale Smart Contract Links** 🔗:

  - Provides direct links to the presale smart contracts on multiple blockchains (ETH, BNB, BASE, POL) for transparency:
    - [ETH Scan](https://etherscan.io/address/0x07d2af0dd0d5678c74f2c0d7adf34166dd37ae22)
    - [BNB Scan](https://bscscan.com/address/0x1ddf0e740219960f9180ef73cbc7a5383adfc701)
    - [BASE Scan](https://basescan.org/address/0x9c29d024c6cdfae7ea5df76068a3b63b904dc3b9)
    - [POL Scan](https://polygonscan.com/address/0xb821b7fb4a82443ff6d8480408f9558db409fe2f)

- **Interactive "Buy $CHRLE" Button** 🛒: Lets users easily navigate to the presale website and participate in the presale by purchasing tokens.

---

## 🛠️ Technology Stack

- **Telegram Bot API** 🤖: The bot uses the official Telegram Bot API to interact with users and send messages.
- **Node.js** 🟩: The bot is built using Node.js for the backend.
- **Axios** 🌐: Used to fetch data and interact with external APIs.
- **FFmpeg** 🎬: For generating the small video alerts that are sent with each transaction.
- **Webhooks** 🔗: Real-time alerts based on presale transactions.

---

## 💻 Installation

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/jesusking2722/charlie-telegram-buy-bot.git
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary packages:

```bash
cd charlie-telegram-buy-bot
yarn install
```

### 3. Configure Bot

Create a new bot on Telegram using [BotFather](https://t.me/BotFather) and get the API Token.
Set up environment variables by creating a .env file in the root of the project and adding the following:

```bash
BOT_TOKEN=7568286442:AAF7Uo3YWFof9i-RA7ySJAeROSBMn6GcTx8
FILE_ID=BAACAgQAAxkBAAKUzmfI6MzkkIAWG_qGMaRpMdoJG3luAAIMHAACAyZIUv6aPJ10_yUuNgQ
CHANNEL_ID=-1002396942711
SHEET_ID=18ZcSqIUvyx7diuMVsSdF5HpNM5dkKQMU-OJIWA8fg98
```

### 4. Start the Bot

Run the following command to start the bot:

```bash
yarn add
```

The bot will now start sending buy alerts to your Telegram group!

---

## 📊 Bot Logic

The bot listens for buy transactions on the presale website and sends a notification message in the Telegram group with the following details:

### 1. Transaction Data:

- Amount of $CHRLE tokens bought
- Price of tokens in USD
- A small video about the purchase

### 2. Presale Stats:

- Total amount of tokens sold
- Total value of sold tokens in USD
- Current and next token prices
- Current number of token holders

### 4. Smart Contract Links:

- Provides links to the presale smart contracts on different blockchain explorers (ETH, BNB, BASE, POL).

### 5. "Buy $CHRLE" Button:

- A button with the label "Buy $CHRLE" will be displayed, which redirects users to the presale website when clicked.

---

## 🤝 Contributing

We welcome contributions to improve Charlie Telegram Buy Bot! If you would like to contribute, please follow these steps:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature'`).
5. Push to your branch (`git push origin feature-name`).
6. Open a pull request.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE]() file for details.

---

## 🌍 Links

- [Charlie Presale Website](https://charlieunicornai-sale.eu)
- [Telegram Bot Chat](https://t.me/charlie_presale_news_bot)

---

<p align="center"> <img src="https://img.shields.io/github/repo-size/jesusking2722/charlie-telegram-buy-bot?color=blue&style=for-the-badge" alt="Repository size" /> <img src="https://img.shields.io/badge/Node.js-%3E%3E-%23F7DF1E?style=for-the-badge&logo=node.js" alt="Node.js" /> <img

---

## "Charlie Unicorn AI is dedicated to providing transparency and real-time updates for our token holders." - Charlie Unicorn AI Team

### Key Sections Explained:

- **Title & Intro**: The bot's functionality is summarized along with the core features.
- **Features**: Highlights the main features of the bot with icons for better visual appeal.
- **Tech Stack**: Lists the technologies used for building the bot.
- **Installation**: Step-by-step guide on how to set up and run the bot locally.
- **Bot Logic**: Describes what the bot does, how it works, and the information it sends to the Telegram group.
- **Contributing**: Encourages developers to contribute to the project, with clear steps for submitting improvements.
- **License**: Specifies the open-source license for the project.
- **Links**: Direct links to the presale website and Telegram chat.
- **Badges and Logo**: Adds repository size, Node.js, and Telegram icons for visual appeal.

Make sure to replace `your-presale-website-url`, `your-telegram-chat-link`, and other placeholders with actual URLs. Feel free to add your logo image in the assets folder and update the path in the `README.md`.
