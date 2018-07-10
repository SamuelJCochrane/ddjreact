const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    hoursWanted: {
        type: Number,
        trim: true
    }
})

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;