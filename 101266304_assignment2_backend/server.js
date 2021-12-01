const express = require('express');
const bodyParser = require('body-parser')
const  mongoose  = require('mongoose');
const cors = require('cors');
const app = express();
const Employee = require('./models/Employee');

app.use(cors());

// express js configuration 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// connecting to mongodb
mongoose.connect('mongodb+srv://fatih:fatih1234@cluster0.4ngcb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

// creating routes
app.get('/api/v1/employees', async (req, res) => {
    let employees = await Employee.find({});
    if(employees && res.status(200)){
        res.send(employees);
    }
    else{
        res.status(404).send("Can't find employees");
    }
});

app.get('/api/v1/employees/:id', async (req, res) => {
    let employee = await Employee.findById(req.params.id);
    if(employee && res.status(200)){
        res.send(employee);
    }
    else{
        res.status(404).send("Could't find the employee");
    }
});

app.put('/api/v1/employees/:id', async (req, res) => {
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

app.delete('/api/v1/employees/:id', async (req, res) => {
    try{
        await Employee.findByIdAndDelete(req.params.id);
        res.send(`Employee deleted successfully`);
    } catch(error){
        res.status(404).send("Could't find the employee");
    }
});

app.post('/api/v1/employees', async (req, res) => {
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

const PORT = 5000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));