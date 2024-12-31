import express, { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/test', (req: Request, res: Response) => {
  res.send('ini route test');
})

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
