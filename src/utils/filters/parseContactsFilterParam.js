import { typeContacts } from "../../constants/contacts.js";

export const parsContactFilterParams = ({ type, isFavorite }) => {
  const parsedType = typeContacts.includes(type) ? type : undefined;

  const parsedIsFavorite =
    isFavorite === "true" ? true : isFavorite === "false" ? false : undefined;
  return {
    type: parsedType,
    isFavorite: parsedIsFavorite,
  };
};
