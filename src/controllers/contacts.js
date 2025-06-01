import createHttpError from "http-errors";
import {
  addContact,
  deleteContactById,
  getContacts,
  getContactsById,
  updateContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { contactsSortFields } from "../db/models/Contacts.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parsContactFilterParams } from "../utils/filters/parseContactsFilterParam.js";

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactsSortFields);
  const filters = parsContactFilterParams(req.query);
  filters.owner = req.user._id;
  const data = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });
  res.json({
    status: 200,
    message: "Successfully find contacts",
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getContactsById(id);
  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await addContact({ ...req.body, owner });

  res.status(201).json({
    status: 201,
    message: "Successfully add movie",
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { data, isNew } = await updateContact(id, req.body, { upsert: true });
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: "Successfully update Contact",
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: "Successfully update Contact",
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};
