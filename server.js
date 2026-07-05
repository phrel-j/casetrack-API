import express from 'express';
import { prisma } from './db.js';


import authRouter from './router/auth.js';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import teamsRouter from './router/teams.js';
import playersRouter from './router/players.js';
import matchesRouter from './router/matches.js';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors()); // wide open for now — you'll restrict this to your real frontend domain later
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 10 requests per IP in that window
  message: { error: 'Too many attempts, try again later' },
});

app.use('/auth/login', authLimiter);
app.use('/auth/register', authLimiter);





app.use(express.json()); // middleware: lets us read req.body as JSON

app.use('/matches', matchesRouter);

app.use('/players', playersRouter);

app.use('/teams', teamsRouter);

app.use('/auth', authRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('PlayBook API is running');
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));