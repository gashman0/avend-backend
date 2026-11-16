import Investment from "../../models/investment-model.js";

const calculateElapsedDays = (startDate, durationDays) => {
  const start = new Date(startDate);
  const now = new Date();

  // Compare calendar days, ignoring time of day.
  const startDay = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate()
  );

  const currentDay = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const elapsed = Math.floor(
    (currentDay - startDay) / (1000 * 60 * 60 * 24)
  );

  return Math.min(Math.max(elapsed, 0), durationDays);
};

export const getUserInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({
      user: req.user.id,
    })
      .populate("plan", "name")
      .sort({ createdAt: -1 })
      .lean();

    const formattedInvestments = investments.map((investment) => {
      const elapsedDays = calculateElapsedDays(
        investment.startDate,
        investment.durationDays
      );

      const remainingDays = Math.max(
        investment.durationDays - elapsedDays,
        0
      );

      // Daily ROI credit is based on the USD principal.
      const dailyRoi =
        investment.amountUSD * (investment.roiRate / 100);

      let displayStatus = investment.status;

      if (investment.status === "completed") {
        displayStatus = "Matured";
      } else if (investment.status === "cancelled") {
        displayStatus = "Cancelled";
      } else {
        displayStatus = "Active";
      }

      return {
        _id: investment._id,
        id: investment.investmentId,

        plan: investment.plan?.name ?? "Investment Plan",

        asset: investment.asset,

        // USD principal for frontend display.
        principal: investment.amountUSD,

        // Original cryptocurrency quantity.
        amount: investment.amount,

        roiEarned: investment.roiEarned,
        dailyRoi,
        roiRate: investment.roiRate,

        duration: investment.durationDays,
        elapsedDays,
        remainingDays,

        startDate: investment.startDate,
        maturityDate: investment.maturityDate,

        status: displayStatus,
      };
    });

    // Summary calculations
    const totalInvested = formattedInvestments.reduce(
      (total, investment) => total + investment.principal,
      0
    );

    const totalRoiEarned = formattedInvestments.reduce(
      (total, investment) => total + investment.roiEarned,
      0
    );

    const activeInvestments = formattedInvestments.filter(
      (investment) => investment.status === "Active"
    );

    const activePrincipal = activeInvestments.reduce(
      (total, investment) => total + investment.principal,
      0
    );

    return res.status(200).json({
      success: true,

      summary: {
        totalInvested,
        activePrincipal,
        totalRoiEarned,
        activeInvestmentCount: activeInvestments.length,
      },

      investments: formattedInvestments,
    });
  } catch (error) {
    console.error("Get user investments error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve your investments.",
    });
  }
};
