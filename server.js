import express from "express";
import dotenv from "dotenv";
dotenv.config();
import 'express-async-errors'
import morgan from 'morgan';

import connectDB from "./db/connect.js";

import authRouter from "./router/authRouter.js";
import jobsRouter from "./router/jobsRouter.js";


import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

const app = express();

const port = 5000;

app.use(express.json());

if (process.env.NODE_ENV !== 'production')
{
  
app.use(morgan('dev'))

}


app.get("/api/v1", (req, res) => {
  res.json({msg :"hello there "})
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, console.log(`app is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
