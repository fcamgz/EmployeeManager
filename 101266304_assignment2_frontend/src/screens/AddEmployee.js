import React, {useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AddEmployee = () => {
    const navigate = useNavigate();

    const first_name = useRef();
    const last_name = useRef();
    const email_input = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        let employeeInfo = {
            firstName: first_name.current.value,
            lastName: last_name.current.value,
            email: email_input.current.value
        }
        console.log(employeeInfo);
        fetch('/api/v1/employees', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(employeeInfo)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
        navigate('/employees');
    }
    return(
        <div style={{height: '100vh'}}>
            <Navbar/>
            <div className='container h-100'>
            <br/>
            <h2 className='text-center'>Add Employee</h2>
            <hr/>
            <br/>
            <div className='d-flex justify-content-center'>
                <form className='w-50' onSubmit={handleSubmit}> 
                    <div> 
                        <div className="form-group">
                            <label className='form-label' htmlFor="first_name">First Name</label>
                            <input type="text" name='first_name' className="form-control" ref={first_name} placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                            <label className='form-label' htmlFor="last_name">Last Name</label>
                            <input type="text" name='last_name' className="form-control" ref={last_name} placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                            <label className='form-label' htmlFor="email_input">Email</label>
                            <input type="text" name='user_email' className="form-control" ref={email_input} placeholder="Email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <br/>
                        <div className='d-flex justify-content-between'>
                            <button className="btn btn-success">Submit</button>
                            <Link className='btn btn-danger' to='/employees'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddEmployee;