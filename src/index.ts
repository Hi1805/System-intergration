import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
const upload = multer();
const port = process.env.PORT || 5000;

app.use('/api', upload.array('files', 15), apiRouter);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
