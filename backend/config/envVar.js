import dotenv from 'dotenv'
dotenv.config();


export const ENV_VARs = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMBD_API_KEY: process.env.TMBD_API_KEY,
    TMBD_API_TOKEN: process.env.TMBD_API_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KET: process.env.STRIPE_PUBLIC_KET
}