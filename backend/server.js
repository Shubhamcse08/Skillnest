import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";

import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js'

const app = express();
app.use(express.json())
app.use(cors());

app.use("/api/courses",courseRoutes)
app.use("/api/auth",authRoutes);

// connect db
connectDB()

app.get("/",(req,res)=>{
    res.send("API is running...")
})

