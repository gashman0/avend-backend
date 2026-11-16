import express from "express";
import { protectUser } from "../../middleware/ProtectUser.js";
import { signup } from "../../controllers/user-auth/signup-controller.js";
import { login } from "../../controllers/user-auth/login-controller.js";
import { refresh } from "../../controllers/user-auth/refresh-controller.js";
import { logout } from "../../controllers/user-auth/logout-controller.js";
import { getMe } from "../../controllers/user/me.js";
import { getDashboardSummary } from "../../controllers/user/dashboard-summary-controller.js";
import { getWallet } from "../../controllers/user/wallet-controller.js";
import { getInvestmentPlans } from "../../controllers/user/investment-plan-controller.js";
import { getUserInvestments } from "../../controllers/user/investment-controller.js";
import { getUserTransactions } from "../../controllers/user/transaction-controller.js";


const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);


authRouter.get('/me', protectUser, getMe);
authRouter.get('/dashboard', protectUser, getDashboardSummary);
authRouter.get('/wallet', protectUser, getWallet);
authRouter.get('/investment-plans', protectUser, getInvestmentPlans);
authRouter.get('/investments', protectUser, getUserInvestments);
authRouter.get('/transactions', protectUser, getUserTransactions);



export default authRouter;