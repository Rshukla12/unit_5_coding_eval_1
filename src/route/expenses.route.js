const express = require("express");

const validator = require("../utils/validators");
const validatorMiddleware = require("../middleware/validator.middleware");
const { body } = require("express-validator");

const expenseController = require("../controller/expenses.controller");

const router = express.Router();

router.get("/", expenseController.getAllExpense);
router.get("/:employee_id", expenseController.getExpenseByEmployee);
router.post("/", ...validator, validatorMiddleware, expenseController.createNewExpense);
router.post("/:expense_id", 
            body('reimbursed').notEmpty().withMessage("Reimbursed is required").isBoolean().withMessage("Reimbursed can only be boolean"), 
            validatorMiddleware, 
            expenseController.reimburseExpense
    );

module.exports = router;