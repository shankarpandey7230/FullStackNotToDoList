import express from 'express';
import taskRouter from './src/routers/taskRouter.js';
import morgan from 'morgan';

import { connectMongodb } from './src/config/dbConfig.js';
import cors from 'cors';
import path from 'path';

connectMongodb();

const app = express();
const PORT = process.env.PORT || 8000;

// connect MongoDB
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// static serving

const __dirname = path.resolve();
// console.log(__dirname);
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.use('/api/v1/tasks', taskRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
