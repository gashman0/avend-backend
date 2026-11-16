
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "deposit",
        "withdrawal",
        "investment",
        "roi",
        "principal_return",
        "referral_reward",
      ],
    },

    asset: {
      type: String,
      required: true,
      enum: ["BTC", "ETH", "USDT", "BNB", "SOL"],
    },

    // Amount in the selected cryptocurrency
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // USD equivalent at transaction time
    amountUSD: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed", "rejected"],
      default: "pending",
      index: true,
    },

    // Blockchain network, where applicable
    network: {
      type: String,
      trim: true,
    },

    // Blockchain transaction reference, where applicable
    txHash: {
      type: String,
      trim: true,
    },

    // Related investment, where applicable
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
    },

    description: {
      type: String,
      trim: true,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ user: 1, type: 1, status: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
