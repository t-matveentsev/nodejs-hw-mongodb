import ContactsCollection from "../db/models/Contacts.js";

export const getContacts = () => ContactsCollection.find();

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
