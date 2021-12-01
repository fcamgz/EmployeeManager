import React, {useRef, useState, useEffect} from 'react';
import {Link, renderMatches, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const UpdateEmployee = () => {
    const [userData, setUserData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailData, setEmailData] = useState('');
    
    useEffect(() => {
        axios.get(`/api/v1/employees/${id}`)
        .then(response => response.data)
        .then(response => {
            setUserData(response);
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setEmailData(response.emailId);
        })
        .catch(error => console.log(error))
    }, []);

    const first_name = useRef();
    const last_name = useRef();
    const email_input = useRef();

    const navigate = useNavigate();
    const {id} = useParams();


    const handleUpdate = (e) => {
        e.preventDefault();
        let userInput = {
            firstName: first_name.current.value,
            lastName: last_name.current.value,
            emailId: email_input.current.value
        }
        axios.put(`/api/v1/employees/${id}`, userInput)
        .then(response => response.data)
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
            <h2 className='text-center'>Update Employee</h2>
            <hr/>
            <br/>
            <div className='d-flex justify-content-center'>
                <form className='w-50' onSubmit={handleUpdate}> 
                    <div> 
                        <div className="form-group">
                            <label className='form-label' htmlFor="first_name">First Name</label>
                            <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} name='first_name' ref={first_name} className="form-control" placeholder="First Name"/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label className='form-label' htmlFor="last_name">Last Name</label>
                            <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} name='last_name' ref={last_name} className="form-control" placeholder="Last Name"/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label className='form-label' htmlFor="email_input">Email</label>
                            <input type="text" onChange={(e) => setEmailData(e.target.value)} value={emailData} ref={email_input} name='user_email' className="form-control" placeholder="Email"/>
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

export default UpdateEmployee;