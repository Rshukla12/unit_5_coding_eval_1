const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model("Employee", employeeSchema, "employee");
module.exports = Employee;