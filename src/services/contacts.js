import ContactsCollection from "../db/models/Contacts.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({ page = 1, perPage = 10 }) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactsCollection.find();

  const [totalItems, data] = await Promise.all([
    ContactsCollection.find().merge(contactQuery).countDocuments(),

    contactQuery.skip(skip).limit(perPage).exec(),
  ]);

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    totalItems,
    ...paginationData,
  };
};

export const getContactsById = (id) => ContactsCollection.findOne({ _id: id });

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    { _id },
    payload,
    {
      new: true,
      upsert,
      includeResultMetadata: true,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id) =>
  ContactsCollection.findOneAndDelete({ _id });
