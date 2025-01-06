import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import sequelize from './database/db';
import bodyParser from 'body-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use('/auth', authRoutes);



sequelize.sync().then(() => {
  console.log('Database connected & tables synced');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
