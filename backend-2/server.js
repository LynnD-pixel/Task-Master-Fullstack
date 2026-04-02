import cors from "cors";
import 'dotenv/config'
import express from 'express';
import connectDB from "./config/db.js";
import userRoutes from "./routes/api/userRoutes.js";
import projectRoutes from "./routes/api/projectRoutes.js";
import taskRoutes from "./routes/api/taskRoutes.js";

connectDB()

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);


app.use("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    console.log('Server running on port' + PORT);
});