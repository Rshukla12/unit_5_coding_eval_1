const { body } = require("express-validator");

const expenseValidator = [
    body('type').notEmpty().withMessage("Type is required!"),
    body('employee_id').notEmpty().withMessage("Employee Id is required"),
];

module.exports = expenseValidator;