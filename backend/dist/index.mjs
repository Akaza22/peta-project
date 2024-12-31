import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Halo revandicka');
});
app.get('/test', (req, res) => {
    res.send('ini route test');
});
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
