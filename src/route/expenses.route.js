const express = require("express");

const validator = require("../utils/validators");

const validatorMiddleware = require("../middleware/validator.middleware");

const expenseController = require("../controller/expenses.controller");

const router = express.Router();

router.post("/", ...validator, validatorMiddleware, expenseController.createNewExpense);

module.exports = router;