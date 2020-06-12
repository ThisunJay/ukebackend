const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },
    nicNo: {
        type: String
    },
    address: {
        type: String
    },
    projectLocation: {
        type: String
    },
    empNo: {
        type: String
    },
    mobileNo: {
        type: String
    },
    bankAccDetails: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employees', EmployeeSchema );