

import Transaction from "../../models/transactions-model.js";

const transactionTypeLabels = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  investment: "Investment",
  roi: "ROI Credit",
  principal_return: "Principal Return",
  referral_reward: "Referral Reward",
};

const transactionStatusLabels = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
  rejected: "Rejected",
};

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .select("-__v -user")
      .lean();

    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction.transactionId,
      type: transactionTypeLabels[transaction.type] || transaction.type,
      asset: transaction.asset,
      amount: transaction.amount,
      usdValue: transaction.amountUSD,
      date: transaction.createdAt,
      status:
        transactionStatusLabels[transaction.status] ||
        transaction.status,
      description:
        transaction.description || "Transaction recorded.",
      ...(transaction.txHash && {
        txid: transaction.txHash,
      }),
    }));

    return res.status(200).json({
      success: true,
      count: formattedTransactions.length,
      transactions: formattedTransactions,
    });
  } catch (error) {
    console.error("Get user transactions error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve your transactions.",
    });
  }
};
