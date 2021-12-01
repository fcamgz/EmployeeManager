import React from 'react';
import {Link} from 'react-router-dom'; 

const Employee = ({employee}) => {
    return(
        <div>
            <ul className='list-group m-3'>
              <li className='list-group-item' key={employee._id}>
                <div className='row m-3'>
                  <div className='col-6'> 
                    <Link className='btn btn-primary' to={employee._id}>View</Link>
                    &nbsp;
                    <Link className='btn btn-danger' to={`delete/${employee._id}`}>Delete</Link>
                    &nbsp;
                    <Link className='btn btn-warning' to={`update/${employee._id}`}>Update</Link>    
                  </div>
                  <div className='col-6'>
                    <h4>{employee.firstName} {employee.lastName}</h4>
                    <p>{employee._id}</p> 
                  </div>
                </div>
              </li>
            </ul>
        </div>
    )
}

export default Employee;