const Employee = require("../model/employee.model");
const Expense = require("../model/expense.model");

const getAllExpense = async (req, res) => {
    try {
        // const page =

    } catch ( err ) {
        res.status(500).json({status: "failure", msg: "Something went wrong!"});
    }
};

const createNewExpense = async (req, res) => {
    try {
        // data is validated
        const doesEmployeeExist = await Employee.findById(req.body.employee_id);
        if ( !doesEmployeeExist ) return res.status(401).json({status: "failure", msg: "Please enter a valid employee id!"}); 
        
        const newExpense = await Expense.create({
            type: req.body.type,
            expense_date: new Date(),
            employee_id: req.body.employee_id
        });

        if ( !newExpense ) return res.status(500).json({status: "failure", msg: "Something went wrong while creating new expense request!"})
        res.status(201).json({status: "success", msg: "New Expense created successfully!", data: newExpense});
    } catch ( err ) {
        res.status(500).json({status: "failure", msg: "Something went wrong!"});
    }
};


const reimburseExpense = async (req, res) => {
    try {
        // data is validated
        const expense = await Expense.findById(req.params.expense_id);
        if ( !expense ) return res.status(401).json({status: "failure", msg: "Please enter a valid expense id!"}); 

        const updatedExpense = await Expense.findByIdAndUpdate(req.params.expense_id, {
            reimbursed: req.body.reimbursed,
            reimbursed_date: new Date()
        }, { 
            returnOriginal: false
        });
        
        if ( !updatedExpense ) return res.status(500).json({status: "failure", msg: "Something went wrong while updating expense request!"})
        res.status(201).json({status: "success", msg: "Expense updated successfully!", data: updatedExpense});
    } catch ( err ) {
        res.status(500).json({status: "failure", msg: "Something went wrong!"});
    }
};

//     body('reimbursed').isBoolean().withMessage("Reimbursed can only be boolean value!"),


module.exports = {
    createNewExpense,
    reimburseExpense
};