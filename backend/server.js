import express from 'express';
import authRoutes from './routes/auth.route.js'
import { ENV_VARs } from './config/envVar.js';
import { connectDb } from './config/db.js';

const app = express();
const PORT = ENV_VARs.PORT
app.use(express.json());

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port https://localhost:' + PORT);
    connectDb();
});