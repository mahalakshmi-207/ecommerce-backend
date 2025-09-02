import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

connectDB();

app.get ("/api/test",(req,res)=>{
    res.json({message:"Backend is working"})
})

app.use("/api/auth", authRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/products",productRoutes);


const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`🚀Server running on port ${PORT}`));
