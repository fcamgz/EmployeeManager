import React, {useEffect, useState} from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DeleteEmployee = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/v1/employees/${id}`)
        .then(response => response.json())
        .then(data => setEmployeeData(data))
        .catch(error => console.log(error))
    }, []);

    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`/api/v1/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json' 
            }
        })
        .then(response => response.json())
        .then(data => {
            setStatus(data);
        });
        navigate('/employees');
    }

    return(
        <div style={{height: '100vh'}}>
            <Navbar/>
                <div className='d-flex justify-content-center h-100 bg-light'>
                    <div className='w-25'>
                        <br/>
                            <h1>Delete Employee</h1>
                            <hr/>
                            <h2>{employeeData.firstName} {employeeData.lastName}</h2>
                            <h5>{employeeData.emailId}</h5>
                            <h6>{employeeData._id}</h6>
                        <br/>
                        <form onSubmit={handleDelete} className='d-flex justify-content-between'>
                            <button onClick={() => <Navigate to='/employees'/>} className='btn btn-success col-4'>Delete</button>
                            <Link to='/employees' className='btn btn-danger col-4'>Cancel</Link>
                        </form>
                    </div>
                    <br/>
                    <p className='text-center'>{status ? status : ''}</p>
                </div>
                <br/>
            <Footer/>
        </div>
    )
}

export default DeleteEmployee;