import express from "express";
import cors from 'cors'
import authRouter from "./routes/user/auth-routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5174",
            "https://avendcrest.com",
            "https://www.avendcrest.com",
        ],
        credentials: true,
    }),
);

app.use(
    express.json({
        verify: (req, res, buf) => {
            console.log("Raw Body Captured");
            req.rawBody = buf;
        },
    }),
);

app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AvendCrest API is healthy'
  });
});

app.use('/', authRouter);

export default app;