import React, {componentDidMount, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ViewEmployee = () => {
    const [employeeInfo, setEmployeeInfo] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/employees/${id}`)
        .then(response => response.json())
        .then(data => setEmployeeInfo(data))
        .catch(error => console.log(error))
    }, []);

    return(
        <div style={{height: '100vh'}}>
            <Navbar/>
            <div className='d-flex justify-content-center h-100 bg-light'>
                <div className='w-25'>
                    <br/>
                        <h1>View Employee</h1>
                        <hr/>
                        <div className='d-flex justify-content-between'>
                            <Link className='btn btn-secondary btn-sm' to='/employees'>Go Back</Link>
                            <Link className='btn btn-primary btn-sm' to='/employees/new'>Add a new Employee</Link>
                        </div>
                    <div className='d-flex flex-column align-items-center mt-4 bg-light border border-secondary p-3'>
                        <h4 className='text-secondary'>Employee Id</h4>
                        <h5 className='text-break'> {employeeInfo._id}</h5>
                        <br/>
                        <h4 className='text-secondary'>First Name</h4>
                        <h5 className='text-break'>{employeeInfo.firstName}</h5>
                        <br/>
                        <h4 className='text-secondary'>Last Name</h4>
                        <h5 className='text-break'>{employeeInfo.lastName}</h5>
                        <br/>
                        <h4 className='text-secondary'>Email</h4>
                        <h5 className='text-break'>{employeeInfo.emailId}</h5>
                        <br/>
                    </div>
                    <br/>
                    <div className='d-flex justify-content-between'>
                        <Link className='btn btn-success col-4' to={`/employees/update/${id}`}>Update</Link>
                        <Link to={`/employees/delete/${id}`} className='btn btn-danger col-4'>Delete</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ViewEmployee;