const express = require('express');
const bodyParser = require('body-parser')
const  mongoose  = require('mongoose');
const cors = require('cors');
const app = express();
const Employee = require('./models/Employee');
const employeeRoutes = require('./routes/employee');

app.use(cors());

// express js configuration 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// connecting to mongodb
mongoose
  .connect(process.env.MONGO_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connection is succesful'))
  .catch(err => console.log(err));

  
/*
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});
*/

app.use('/api/v1/employees', employeeRoutes);

app.listen(process.env.PORT || 5000, () => console.log('Server is running'));