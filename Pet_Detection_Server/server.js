import cors from 'cors';
import express, { json } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import connectDB from './DataBase/DB.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json({ limit: '50mb' }));
app.use(json());

app.post('/', async (req, res) => {

  const url = `https://5d07-35-204-68-75.ngrok-free.app/greet?name=${req.body.name}`
  console.log(`Fetching data from: ${url}`);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return res.status(200).json({
    message: data,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});