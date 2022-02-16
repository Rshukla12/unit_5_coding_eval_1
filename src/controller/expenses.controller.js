const Employee = require("../model/employee.model");
const Expense = require("../model/expense.model");

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

//     body('reimbursed').isBoolean().withMessage("Reimbursed can only be boolean value!"),


module.exports = {
    createNewExpense
};