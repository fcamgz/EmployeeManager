const router = require('express').Router();
const Employee = require('../models/Employee');

// creating routes
router.get('/', async (req, res) => {
    let employees = await Employee.find({});
    if(employees && res.status(200)){
        res.send(employees);
    }
    else{
        res.status(404).send("Can't find employees");
    }
});

router.get('/:id', async (req, res) => {
    let employee = await Employee.findById(req.params.id);
    if(employee && res.status(200)){
        res.send(employee);
    }
    else{
        res.status(404).send("Could't find the employee");
    }
});

router.put('/:id', async (req, res) => {
    await Employee.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId    
    },
    { useFindAndModify: false });
    if(res.status(200)){
        res.send(`Employee information updated successfully
            fName: ${req.body.firstName} lName: ${req.body.lastName} emailId ${req.body.emailId}
        `);
    }
    else{
        res.status(404).send("Could't find the employee");
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Employee.findByIdAndDelete(req.params.id);
        res.send(`Employee deleted successfully`);
    } catch(error){
        res.status(404).send("Could't find the employee");
    }
});

router.post('/', async (req, res) => {
    try {
        let new_employee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId : req.body.email
        });
        await new_employee.save();
        res.send(new_employee);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = router;