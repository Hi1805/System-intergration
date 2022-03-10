import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
