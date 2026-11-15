
import mongoose from "mongoose";

const dashboardSummarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // Total value of available balances and invested principal (USD)
    totalPortfolioValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Available funds across all supported cryptocurrencies (USD equivalent)
    availableBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Principal currently allocated to investments (USD)
    totalInvested: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Cumulative ROI credited to the user's wallet (USD equivalent)
    roiEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Number of investments currently active
    activeInvestmentCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // References to the user's active investments
    activeInvestments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investment",
      },
    ],

    // References to the user's most recent transactions
    recentTransactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DashboardSummary = mongoose.model(
  "DashboardSummary",
  dashboardSummarySchema
);

export default DashboardSummary;
