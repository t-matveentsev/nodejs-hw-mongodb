import { Schema, model } from "mongoose";

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
      enum: ["work", "home", "personal"],
      default: "personal",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const ContactsCollection = model("contacts", contactsSchema);

export default ContactsCollection;
