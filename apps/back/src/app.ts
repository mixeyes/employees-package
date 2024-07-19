import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import winston from 'winston';
import morgan from 'morgan';
import os from 'os';
import cluster from 'cluster';
import { rateLimit } from 'express-rate-limit';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const { combine, timestamp, json } = winston.format;
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'http',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      json(),
    ),
    transports: [new winston.transports.Console()],
    // transports: [new winston.transports.File({ dirname: '../../logs', filename: 'log.json', maxsize: 100000, maxFiles: 5 })],
  });

  const morganMiddleware = morgan(
    function (tokens, req, res) {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res) || ''),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat(tokens['response-time'](req, res) || ''),
      });
    },
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => {
          const data = JSON.parse(message);
          logger.http(`incoming-request`, data);
        },
      },
    },
  );

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  })

  app.use(morganMiddleware);
  app.use(compression());
  app.use(cors());
  app.use(limiter);

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  app.listen(PORT, () => {
    console.log(`Worker process ${process.pid} is listening on port ${PORT}`);
  });
}
