import Wallet from "../../models/wallet-model.js";
import Transaction from "../../models/transactions-model.js";


// import walletModel from "../../models/wallet-model.js";
// import transactionModel from "../../models/transaction-model.js";

export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOneAndUpdate(
      { user: req.user.id },
      {
        $setOnInsert: {
          user: req.user.id,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    const recentDeposits = await Transaction
      .find({
        user: req.user.id,
        type: "deposit",
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "transactionId asset amount amountUSD status createdAt"
      )
      .lean();

    res.json({
      wallet,
      recentDeposits,
    });
  } catch (error) {
    console.error("Get wallet error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
