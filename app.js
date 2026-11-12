import express from "express";
import cors from 'cors'

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

// app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AvendCrest API is healthy'
  });
});

export default app;