const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/contacts.js");

router.get("/", controllers.listContacts);
router.get("/:contactId", controllers.getContactById);
router.post("/", controllers.addContact);
router.put("/:contactId", controllers.updateContact);
router.delete("/:contactId", controllers.removeContact);

module.exports = router;
