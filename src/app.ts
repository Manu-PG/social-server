import { configDotenv } from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routes/userRotuer';
import mongoose from 'mongoose';
import postRouter from './routes/postRouter';
import commentRouter from './routes/commentRouter';

configDotenv();
const PORT = process.env.PORT;
const app = express();

/////////// MONGO DB CONNECTION ////////////
const monoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
async function main() {
  await mongoose.connect(monoDB);
}
main().catch((e) => console.log(e));
//----------------------------------------//

// Express Middlewares
app.use(helmet());
app.use(cors());
//app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// erver Health Check
app.get('/health-check', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
