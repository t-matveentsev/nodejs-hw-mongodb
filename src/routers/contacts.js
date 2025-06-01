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
import { validateBody } from "../utils/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  contactsCreateSchema,
  contactsUpdateSchema,
} from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post(
  "/",
  validateBody(contactsCreateSchema),
  ctrlWrapper(addContactController)
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(contactsCreateSchema),
  ctrlWrapper(upsertContactController)
);

contactsRouter.patch(
  "/:id",
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(patchContactController)
);

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
