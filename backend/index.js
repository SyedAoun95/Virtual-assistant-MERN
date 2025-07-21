import express from "express"
import dotenv from "dotenv"
 dotenv.config({ path: "./.env" });
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

// dotenv.config({ path: "./.env" }); // load env from backend/.env
const app= express()
const port= process.env.PORT || 5000

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
//convert the data into json format 
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.listen(port,()=>{
    connectDb()
    console.log("server is started")
})