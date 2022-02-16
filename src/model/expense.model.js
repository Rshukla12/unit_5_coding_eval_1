const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["internet", "travel", "logistics", "food", "others"],
        default: "others"
    },
    expense_date: {
        type: Date,
        required: true
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    reimbursed: {
        type: Boolean,
        required: true,
        default: false
    },
    reimbursed_date: {
        type: Date
    }

}, {
    timestamps: true
});

const Expense = mongoose.Model("Expense", expenseSchema);
module.exports = Expense;