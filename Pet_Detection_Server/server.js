import cors from 'cors';
import express, { json } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user_routes.js';
import connectDB from './DataBase/DB.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.use(cors({
  origin: "*",
}));

app.use(express.json({ limit: '50mb' }));
app.use(json());

app.use('/', userRoutes);

app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});