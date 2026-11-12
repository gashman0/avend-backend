import express from "express";
import cors from 'cors'

import fs from "fs"

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5174/",
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

export default app;