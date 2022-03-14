import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
