import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddEmployee from './screens/AddEmployee';
import DeleteEmployee from './screens/DeleteEmployee';
import ListEmployees from './screens/ListEmployees';
import UpdateEmployee from './screens/UpdateEmployee';
import ViewEmployee from './screens/ViewEmployee';

class App extends React.Component{

  render(){
    return (
      <Router>
        <div>
          <Routes>
            <Route element={<ListEmployees/>} exact path='/employees'/>
            <Route element={<AddEmployee/>} exact path='/employees/new'/>
            <Route element={<ViewEmployee/>} exact path='/employees/:id'/>
            <Route element={<DeleteEmployee/>} exact path='/employees/delete/:id' />
            <Route element={<UpdateEmployee/>} exact path='/employees/update/:id' />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
