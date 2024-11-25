import express from 'express';
import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'
import { ENV_VARs } from './config/envVar.js';
import { connectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoutues.js';

const app = express();
const PORT = ENV_VARs.PORT
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port https://localhost:' + PORT);
    connectDb();
});