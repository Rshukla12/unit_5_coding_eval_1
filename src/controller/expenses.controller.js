const Employee = require("../model/employee.model");
const Expense = require("../model/expense.model");

const getAllExpense = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const perPage = req.query.per_page || 5;
        const skip = page <= 0 ? 0 : ( page - 1 ) * perPage;
        const sort = req.query.sort || "asc";
        
        const start_date = new Date(req.params.start || 0);
        const end_date = new Date(req.params.end || "2040");
        
        const expenses = await Expense.find({
            date: {$gte: start_date, $lte: end_date}
        }).sort({expense_date: sort}).skip(skip).limit(perPage);
        if ( !expenses ) return res.status(404).json({msg: "No expenses were made at that time!"});
        res.status(200).json({staus: "success", data: expenses});
    } catch ( err ) {
        console.log(err);
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

const getExpenseByEmployee = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const perPage = req.query.per_page || 5;
        const skip = page <= 0 ? 0 : ( page - 1 ) * perPage;
        const sort = req.query.sort || "asc";
        
        const expenses = await Expense.find({employee_id: req.params.employee_id}).sort({expense_date: sort}).skip(skip).limit(perPage);
        if ( !expenses || !expenses.length ) return res.status(404).json({msg: "No expense made by employee!"});
        res.status(200).json({staus: "success", data: expenses});
    } catch ( err ) {
        res.status(500).json({status: "failure", msg: "Something went wrong!"});
    }
};


const getExpenseByType = async (req, res) => {
    try {
        let sort = req.query.sort || "asc";
        sort = sort === "asc" ? 1 : -1;
        const expenses = await Expense.aggregate([{$group: {_id: "$type", count: { $sum: 1 }} }, {$sort: {count: sort}}]);
        if ( !expenses || !expenses.length ) return res.status(404).json({msg: "No expense of these type!"});
        res.status(200).json({staus: "success", data: expenses});
    } catch ( err ) {
        console.log(err);
        res.status(500).json({status: "failure", msg: "Something went wrong!"});
    }
};

const getAvgTime = async (req, res) => {
    try {
        const expenses = await Expense.aggregate([{$project: { $avg: { $sum: 1 }} }, {$sort: {count: sort}}]);
        if ( !expenses || !expenses.length ) return res.status(404).json({msg: "No expense of these type!"});
        res.status(200).json({staus: "success", data: expenses});
    } catch ( err ) {
        console.log(err);
        res.status(500).json({status: "failure", msg: "Something went wrong!"});
    }
};


//     body('reimbursed').isBoolean().withMessage("Reimbursed can only be boolean value!"),


module.exports = {
    createNewExpense,
    reimburseExpense,
    getAllExpense,
    getExpenseByEmployee,
    getExpenseByType
};