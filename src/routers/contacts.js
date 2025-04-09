import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  addContactController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:id", ctrlWrapper(getContactsByIdController));

contactsRouter.post("/", ctrlWrapper(addContactController));

contactsRouter.put("/:id", ctrlWrapper(upsertContactController));

contactsRouter.patch("/:id", ctrlWrapper(patchContactController));

contactsRouter.delete("/:id", ctrlWrapper(deleteContactController));

export default contactsRouter;
