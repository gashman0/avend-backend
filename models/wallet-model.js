
import mongoose from "mongoose";

const assetBalanceSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    // USD equivalent of the available crypto balance
    valueUSD: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Latest recorded USD price of one unit of this asset
    priceUSD: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    assets: {
      BTC: {
        type: assetBalanceSchema,
        default: () => ({}),
      },

      ETH: {
        type: assetBalanceSchema,
        default: () => ({}),
      },

      USDT: {
        type: assetBalanceSchema,
        default: () => ({}),
      },

      BNB: {
        type: assetBalanceSchema,
        default: () => ({}),
      },

      SOL: {
        type: assetBalanceSchema,
        default: () => ({}),
      },
    },

    // Combined USD value of all available crypto assets
    totalBalanceUSD: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
