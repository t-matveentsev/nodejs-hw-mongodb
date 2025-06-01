import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";

import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(logger);

  app.use("/auth", authRouter);
  app.use("/contacts", contactsRouter);

  app.use("*", notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnvVar("PORT", 4000));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
