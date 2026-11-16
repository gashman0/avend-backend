
import "dotenv/config";
import mongoose from "mongoose";
import InvestmentPlan from "../models/investment-plan-model.js";

const plans = [
  {
    name: "Starter",
    description:
      "A starting point for exploring managed crypto investments.",
    minInvestment: 100,
    maxInvestment: 999,
    dailyRoi: 0.5,
    durationDays: 30,
    features: [
      "Daily ROI credits",
      "30-day investment period",
      "Principal returned at maturity",
      "Dashboard investment tracking",
    ],
    featured: false,
    status: "active",
  },
  {
    name: "Growth",
    description:
      "For investors looking to allocate a larger amount.",
    minInvestment: 1000,
    maxInvestment: 4999,
    dailyRoi: 0.8,
    durationDays: 45,
    features: [
      "Daily ROI credits",
      "45-day investment period",
      "Principal returned at maturity",
      "Dashboard investment tracking",
    ],
    featured: true,
    status: "active",
  },
  {
    name: "Premium",
    description:
      "A higher-tier investment option with a longer term.",
    minInvestment: 5000,
    maxInvestment: 20000,
    dailyRoi: 1,
    durationDays: 60,
    features: [
      "Daily ROI credits",
      "60-day investment period",
      "Principal returned at maturity",
      "Dashboard investment tracking",
    ],
    featured: false,
    status: "active",
  },
];

const seedInvestmentPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB.");

    for (const plan of plans) {
      const result = await InvestmentPlan.updateOne(
        { name: plan.name },
        { $setOnInsert: plan },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        console.log(`Created investment plan: ${plan.name}`);
      } else {
        console.log(`Investment plan already exists: ${plan.name}`);
      }
    }

    console.log("Investment plan seeding completed.");
  } catch (error) {
    console.error("Investment plan seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedInvestmentPlans();
