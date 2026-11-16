
import mongoose from "mongoose";

const investmentPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    minInvestment: {
      type: Number,
      required: true,
      min: 0,
    },

    maxInvestment: {
      type: Number,
      required: true,
      min: 0,
    },

    // Stored as a percentage.
    // Example: 0.5 means 0.5% daily.
    dailyRoi: {
      type: Number,
      required: true,
      min: 0,
    },

    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },

    features: {
      type: [String],
      required: true,
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure the maximum investment is not below the minimum.
investmentPlanSchema.pre("validate", function () {
  if (
    this.minInvestment !== undefined &&
    this.maxInvestment !== undefined &&
    this.maxInvestment < this.minInvestment
  ) {
    this.invalidate(
      "maxInvestment",
      "Maximum investment cannot be lower than minimum investment."
    );
  }
});

const InvestmentPlan = mongoose.model(
  "InvestmentPlan",
  investmentPlanSchema
);

export default InvestmentPlan;
