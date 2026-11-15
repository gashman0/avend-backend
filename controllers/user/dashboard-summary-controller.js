
import dashboardSummaryModel from "../../models/dashboard-summary-model.js";
import Investment from "../../models/investment-model.js";
import Transaction from "../../models/transactions-model.js";


export const getDashboardSummary = async (req, res) => {
  try {
    const summary = await dashboardSummaryModel.findOneAndUpdate(
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
    )
      .populate("activeInvestments")
      .populate("recentTransactions");

    res.json(summary);
  } catch (error) {
    console.error("Get dashboard summary error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
