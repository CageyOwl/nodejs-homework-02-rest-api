const contacts = require("../models/contacts.js");
const HttpError = require("../utils/HttpError.js");
const controllerWrapper = require("../utils/controllerWrapper.js");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string().required(),
});

const listContacts = async (req, res, next) => {
  res.json(await contacts.listContacts());
};

const getContactById = async (req, res, next) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found.");
  }
  res.json(contact);
};

const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found.");
  }
  res.json(result);
};

const removeContact = async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found.");
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  removeContact: controllerWrapper(removeContact),
};
