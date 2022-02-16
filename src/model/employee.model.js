const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;