import { Schema, model } from "mongoose";
import { typeContacts } from "../../constants/contacts.js";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      enum: typeContacts,
      default: typeContacts[0],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleSaveError);

contactsSchema.pre("findOneAndUpdate", setUpdateSettings);

contactsSchema.post("findOneAndUpdate", handleSaveError);

export const contactsSortFields = [
  "name",
  "phoneNumber",
  "isFavorite",
  "contactType",
];

const ContactsCollection = model("contacts", contactsSchema);

export default ContactsCollection;
