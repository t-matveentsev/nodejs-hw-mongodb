import express from "express";
import cors from "cors";
import pino from "pino-http";

import { getContacts, getContactsById } from "./services/contacts.js";

import { getEnvVar } from "./utils/getEnvVar.js";
import mongoose from "mongoose";

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/contacts", async (req, res, next) => {
    try {
      const data = await getContacts();
      res.json({
        status: 200,
        message: "Successfully find contacts",
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/contacts/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ status: 400, message: "Invalid contact ID format" });
      }

      const data = await getContactsById(id);
      if (!data) {
        return res
          .status(404)
          .json({ status: 404, message: "Contact not found" });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id=${id}`,
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(getEnvVar("PORT", 4000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
