import { typeContacts } from "../../constants/contacts.js";

export const parsContactFilterParams = ({ contactType, isFavorite }) => {
  const parsedType = typeContacts.includes(contactType)
    ? contactType
    : undefined;

  const parsedIsFavorite =
    isFavorite === "true" ? true : isFavorite === "false" ? false : undefined;
  return {
    type: parsedType,
    isFavorite: parsedIsFavorite,
  };
};
