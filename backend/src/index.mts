import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Halo revandicka');
});

app.get('/test', (req: Request, res: Response) => {
  res.send('ini route test');
})

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
