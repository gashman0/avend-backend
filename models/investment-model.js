
import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Investment plan selected by the user
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InvestmentPlan",
      required: true,
    },

    // Unique investment reference
    investmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Cryptocurrency used for the investment
    asset: {
      type: String,
      required: true,
      enum: ["BTC", "ETH", "USDT", "BNB", "SOL"],
    },

    // Amount invested in cryptocurrency
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // USD value of the principal at investment creation
    amountUSD: {
      type: Number,
      required: true,
      min: 0,
    },

    // Daily ROI percentage captured when investment is created
    roiRate: {
      type: Number,
      required: true,
      min: 0,
    },

    // Cumulative ROI credited by this investment, in USD
    roiEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Investment duration captured from the selected plan
    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },

    startDate: {
      type: Date,
      required: true,
    },

    maturityDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Efficiently retrieve a user's investments.
investmentSchema.index({ user: 1, createdAt: -1 });

// Efficiently retrieve active or completed investments.
investmentSchema.index({ user: 1, status: 1 });

const Investment = mongoose.model("Investment", investmentSchema);

export default Investment;
