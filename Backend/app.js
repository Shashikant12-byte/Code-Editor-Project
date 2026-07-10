import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import runRoute from "./routes/runRoutes.js";
import checkAuth from './middlewares/checkAuth.js'
connectDB();

const app=express();
app.use(cors({
    origin: "https://charis-code-frontend.onrender.com",
    credentials: true,
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute);

app.use('/run',runRoute);

app.get("/",(req,res)=>{
    res.status(200).json({ message: "Hello, World!" });
});

export default app;
