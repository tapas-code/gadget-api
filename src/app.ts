import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

export default app;