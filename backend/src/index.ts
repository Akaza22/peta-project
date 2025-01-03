import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import sequelize from './database/db';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Mengizinkan semua domain
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json());
app.use('/auth', authRoutes);



sequelize.sync().then(() => {
  console.log('Database connected & tables synced');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
