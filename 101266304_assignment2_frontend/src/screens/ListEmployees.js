import React from 'react';
import {Link} from 'react-router-dom';
import Employee from '../components/Employee';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

class ListEmployees extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          employees: [],
        }
      }
    
      // get employees when the app is first loaded
      componentDidMount(){
        fetch('/api/v1/employees')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({employees: data});
        })
        .catch(error => console.log(error));
      }
    
    render(){
        return(
          <div style={{height: '100vh'}}>
            <Navbar/>
            <div className='container h-100'>
                  <br/>
                  <h2 className='text-center'>Employee List</h2>
                  <hr/>
                  <Link className='btn btn-primary' to='/employees/new'>Add a new Employee</Link>
                  <br/>
                  <div className="d-flex flex-column align-items-center">
                  <br/>
                  <div className='w-75'>
                  {this.state.employees.map((employee) => (
                      <Employee key={employee._id} employee={employee}/>
                  ))}
                  </div>
              </div>
            </div>
            <br/>
            <Footer/>
          </div>
        )
    }
} 

export default ListEmployees;