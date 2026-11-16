import InvestmentPlan from "../../models/investment-plan-model.js";

export const getInvestmentPlans = async (req, res) => {
  try {
    const plans = await InvestmentPlan.find({
      status: "active",
    })
      .select("-__v")
      .sort({
        // featured: -1,
        minInvestment: 1,
      })
      .lean();

    const formattedPlans = plans.map((plan) => ({
      ...plan,
      projectedRoi: plan.dailyRoi * plan.durationDays,
    }));

    return res.status(200).json({
      success: true,
      count: formattedPlans.length,
      plans: formattedPlans,
    });
  } catch (error) {
    console.error("Get investment plans error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve investment plans.",
    });
  }
};
