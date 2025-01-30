import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import gadgetRoutes from "./routes/gadget.routes";
import { connectRedis } from "./config/redis";

const app = express();

(async () => {
  await connectRedis();
  //Middlewares
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  app.use("/api/auth", authRoutes);
  app.use("/api/gadgets", gadgetRoutes);
})();

export default app;
