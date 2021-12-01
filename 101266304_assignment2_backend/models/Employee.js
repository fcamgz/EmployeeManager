const mongoose = require('mongoose');
const validator = require('mongoose-validator');

const EmployeeSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        validate:[
            validator({
                validator: 'isEmail',
                message: 'Oops please enter a valid email'
            })
        ],
        required: true
    } 
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;