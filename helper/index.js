const ethers = require("ethers");
const { PRESALE_ABI } = require("../contracts/abis");
const { NETWORKS } = require("../contracts/networks");
const axios = require("axios");

let previousTotalTokensSold = null;
let previousSolanaTxCount = null;

const checkSolanaBuy = async () => {
  try {
    const URL = `https://docs.google.com/spreadsheets/d/${process.env.SHEET_ID}/gviz/tq?tqx=out:json`;
    const response = await axios.get(URL);

    // Remove unwanted characters at the beginning
    const jsonText = response.data.substring(47).slice(0, -2); // Remove "/*O_o*/" and the trailing semicolon
    const data = JSON.parse(jsonText);

    // Function to convert strings to camelCase
    const toCamelCase = (str) => {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, ""); // Remove any spaces
    };

    // Define a mapping for the exact keys you want
    const keyMapping = {
      "Solana Wallet": "solanaWallet",
      "BSC Wallet": "bscWallet",
      "Amount (SOL)": "amount",
      "Tokens Received": "tokens",
      "Transaction ID": "txId",
      "USD Value": "usd",
      Timestamp: "timestamp",
    };

    // Assuming that the first row in the sheet is the header (column names)
    const headers = data.table.cols.map((col) => toCamelCase(col.label)); // Get column names in camelCase
    const rows = data.table.rows.map((row) => {
      const rowData = {};
      row.c.forEach((cell, index) => {
        const cellValue = cell ? cell.v : "";
        const columnName = data.table.cols[index].label;
        // Map the header to the desired key
        const mappedKey = keyMapping[columnName] || toCamelCase(columnName);
        rowData[mappedKey] = cellValue; // Assign the mapped key
      });
      return rowData;
    });

    if (previousSolanaTxCount === null) {
      previousSolanaTxCount = rows.length;
      console.log("solana tx records: ", rows.length);
      return { changeSolana: false };
    }

    const changeSolana = previousSolanaTxCount < rows.length;
    console.log("solana tx records: ", rows.length);
    return {
      changeSolana,
      solanaBoughtTokens: rows[rows.length - 1].tokens,
      solanaBoughtUsd: rows[rows.length - 1].usd,
    };

    return rows;
  } catch (error) {
    console.error("Error fetching Google Sheet:", error.message);
    return [];
  }
};

const formatPrice = (price) => {
  return parseFloat(price.toFixed(5)).toString();
};

function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const initializeTotalTokensSold = async () => {
  try {
    let totalTokensSold = 0;
    for (const network of NETWORKS) {
      const provider = new ethers.JsonRpcProvider(network.rpcUrl);
      const contract = new ethers.Contract(
        network.contractAddress,
        PRESALE_ABI,
        provider
      );
      const tokensSold = await contract.totalTokensSold();
      totalTokensSold += parseFloat(ethers.formatUnits(tokensSold, 18));
    }
    previousTotalTokensSold = totalTokensSold; // Set the initial value
  } catch (error) {
    console.error("Error initializing totalTokensSold:", error);
  }
};

const checkEthBuy = async () => {
  try {
    let totalTokensSold = 0;
    let userBought = 0;
    for (const network of NETWORKS) {
      const provider = new ethers.JsonRpcProvider(network.rpcUrl);
      const contract = new ethers.Contract(
        network.contractAddress,
        PRESALE_ABI,
        provider
      );
      const tokensSold = await contract.totalTokensSold();
      totalTokensSold += parseFloat(ethers.formatUnits(tokensSold, 18));
    }

    // If `previousTotalTokensSold` is null (first run), initialize it without sending a message
    if (previousTotalTokensSold === null) {
      previousTotalTokensSold = totalTokensSold;
      return { changesEth: false };
    }

    // Detect changes
    if (totalTokensSold > previousTotalTokensSold) {
      userBought = totalTokensSold - previousTotalTokensSold;
    }
    const changesEth = totalTokensSold > previousTotalTokensSold;
    previousTotalTokensSold = totalTokensSold; // Update the previous value

    return { changesEth, userBought };
  } catch (error) {
    console.log("check buy error: ", error);
  }
};

const fetchPrices = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(NETWORKS[3].rpcUrl);
    const contract = new ethers.Contract(
      NETWORKS[3].contractAddress,
      PRESALE_ABI,
      provider
    );
    const cs = await contract.currentStage();
    const cp = await contract.stagePrices(Number(cs) - 1);
    const np = await contract.stagePrices(Number(cs));

    const currentPrice = formatPrice(
      parseFloat(1 / parseFloat(ethers.formatUnits(cp, 18)))
    );
    const nextPrice = formatPrice(
      parseFloat(1 / parseFloat(ethers.formatUnits(np, 18)))
    );

    return { currentPrice, nextPrice };
  } catch (error) {
    console.error("fetch price error:", error);
  }
};

const fetchData = async () => {
  try {
    let totalUsers = 0;
    let pricePerToken = 0;
    let totalTokensSold = 0;

    for (const network of NETWORKS) {
      const provider = new ethers.JsonRpcProvider(network.rpcUrl);
      const contract = new ethers.Contract(
        network.contractAddress,
        PRESALE_ABI,
        provider
      );

      // Fetch total users
      const users = await contract.totalUsers();
      totalUsers += Number(users);

      // Fetch perDollarPrice
      const perDollarPrice = await contract.perDollarPrice();
      const tokensPerUSD = ethers.formatUnits(perDollarPrice, 18);
      pricePerToken = 1 / parseFloat(tokensPerUSD);

      // Fetch total tokens sold
      const tokensSold = await contract.totalTokensSold();
      totalTokensSold += parseFloat(ethers.formatUnits(tokensSold, 18));
    }

    const totalSoldPrice = (totalTokensSold * pricePerToken + 14031.11).toFixed(
      2
    );

    const totalTokensSoldReSum =
      14031.11 * (1 / pricePerToken) + parseFloat(totalTokensSold);

    return {
      totalAmount: formatNumberWithSpaces(
        parseFloat(totalTokensSoldReSum).toFixed(2).toString()
      ),
      totalUsers,
      totalSoldPrice: formatNumberWithSpaces(
        parseFloat(totalSoldPrice).toString()
      ),
      pricePerToken: parseFloat(pricePerToken).toString(),
    };
  } catch (error) {
    console.error("fetch allocations error:", error);
  }
};

module.exports = {
  initializeTotalTokensSold,
  checkEthBuy,
  fetchData,
  fetchPrices,
  checkSolanaBuy,
};
