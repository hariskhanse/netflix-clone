import express from 'express';
import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'
import userChoicesRoutes from './routes/userChoices.route.js'
import { ENV_VARs } from './config/envVar.js';
import { connectDb } from './config/db.js';
import { protectRoute } from './middleware/protectRoutues.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = ENV_VARs.PORT
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)
app.use("/api/v1/userChoices", protectRoute, userChoicesRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port https://localhost:' + PORT);
    connectDb();
});