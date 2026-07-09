import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoutes.js";
import runRoute from "./Routes/runRoutes.js";
import checkAuth from './Middlewares/checkAuth.js'
connectDB();

const app=express();
app.use(cors({
    origin: "http://localhost:5173",
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