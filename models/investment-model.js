
import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Reference to the investment plan used
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

    asset: {
      type: String,
      required: true,
      enum: ["BTC", "ETH", "USDT", "BNB", "SOL"],
    },

    // Principal invested, in the selected cryptocurrency
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // USD equivalent when the investment was created
    amountUSD: {
      type: Number,
      required: true,
      min: 0,
    },

    roiRate: {
      type: Number,
      required: true,
      min: 0,
    },

    roiEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

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

investmentSchema.index({ user: 1, status: 1 });

const Investment = mongoose.model("Investment", investmentSchema);

export default Investment;
