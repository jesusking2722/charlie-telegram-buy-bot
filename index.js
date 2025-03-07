const {
  formatNumberWithSpaces,
  checkEthBuy,
  checkSolanaBuy,
} = require("./helper");
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

// Initialize the bot with polling
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const checkPresaleUpdates = async () => {
  try {
    // Fetch for Solana transactions
    const {
      totalSolanaToken,
      totalSolanaTokenUSD,
      changeSolana,
      solanaBoughtTokens,
      solanaBoughtUsd,
    } = await checkSolanaBuy();

    // Fetch Eth presale data
    const {
      userBought,
      changesEth,
      totalAmount,
      totalUsers,
      totalSoldPrice,
      currentPrice,
      nextPrice,
    } = await checkEthBuy();
    console.log("solana changed:", changeSolana, "eth changed: ", changesEth);
    if (changeSolana || changesEth) {
      // If a new purchase is detected (changesEth becomes true)
      let message = "";
      let solanaMessage = "";
      let ethMessage = "";

      console.log(
        "solana bought token: ",
        parseFloat(solanaBoughtTokens).toFixed(2),
        "solana bought usd: ",
        solanaBoughtUsd
      );

      if (changeSolana) {
        solanaMessage = `🔥 *NEW BUY* 🔥\n*$CHRLE:* ${parseFloat(
          solanaBoughtTokens
        ).toFixed(2)}\n$*Dollars:* $${solanaBoughtUsd}\n`;
      } else {
        solanaMessage = "";
      }
      if (changesEth) {
        const priceUSD = (userBought * parseFloat(currentPrice))
          .toFixed(2)
          .toString();

        console.log(
          "eth bought token: ",
          parseFloat(userBought).toFixed(2),
          "eth bought usd: ",
          priceUSD
        );

        console.log(
          "total eth amount: ",
          totalAmount,
          "total eth usd: ",
          totalSoldPrice
        );

        ethMessage = `🔥 *NEW BUY* 🔥\n*$CHRLE:* ${parseFloat(
          userBought
        ).toFixed(2)}\n$*Dollars:* $${priceUSD}\n`;
      } else {
        ethMessage = "";
      }

      const totalSoldTokens = formatNumberWithSpaces(
        parseFloat(totalSolanaToken + parseFloat(totalAmount))
          .toFixed(2)
          .toString()
      );

      const totalSoldTokenUSD = formatNumberWithSpaces(
        parseFloat(parseFloat(totalSolanaTokenUSD) + parseFloat(totalSoldPrice))
          .toFixed(2)
          .toString()
      );

      message = `🚀 *BUY $CHRLE* 🚀\n*🌐 On Multichain:*  BNB, ETH, POLYGON, BASE, SOL, TON 🌐\n${ethMessage}${solanaMessage}━━━━━━━━━━━━━━━━━━━━━\n💲 *Total Tokens Sold:*  ${totalSoldTokens}\n💰 *Amount Sold:*  $${totalSoldTokenUSD}\n🏷 *Current Price Per Token:*  $${currentPrice}\n🏷 *Next Price Per Token:*  $${nextPrice}\n📈 *Total To Raise:*  $19 830 000\n👥 *Total Holders:*  ${totalUsers}\n━━━━━━━━━━━━━━━━━━━━━\n🔗 *Explore on Blockchain:\n*🌐 [🔍*View on Bscscan*](https://bscscan.com/address/0x1ddf0e740219960f9180ef73cbc7a5383adfc701)\n🌐 [🔍*View on Etherscan*](https://etherscan.io/address/0x07d2af0dd0d5678c74f2c0d7adf34166dd37ae22)\n🌐 [🔍*View on Basescan*](https://basescan.org/address/0x9c29d024c6cdfae7ea5df76068a3b63b904dc3b9)\n🌐 [🔍*View on Polygonscan*](https://polygonscan.com/address/0xb821b7fb4a82443ff6d8480408f9558db409fe2f)\n🎯 *Live explore on blockchain how it is not changed there nothing*`;
      // 7049993896
      await bot.sendVideo(process.env.CHANNEL_ID, process.env.FILE_ID, {
        caption: message,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Buy $CHRLE",
                url: "https://charlieunicornai-sale.eu/",
              },
            ],
          ],
        },
      });
      console.log("✅ Purchase detected: Notification sent.");
    }
    console.log(changeSolana, changesEth);
  } catch (error) {
    console.error("Error checking presale updates:", error);
  }
};

setInterval(checkPresaleUpdates, 20000);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const message = "123";

  // Send a message to the user when they type /start
  bot.sendVideo(chatId, process.env.FILE_ID, {
    caption: message,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Buy $CHRLE",
            url: "https://charlieunicornai-sale.eu/",
          },
        ],
      ],
    },
  });
  console.log(chatId);
  // console.log("✅ Purchase detected: Notification sent.");
});
