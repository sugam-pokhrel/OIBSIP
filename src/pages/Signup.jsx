import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from '../components/Modal';
import '../components/Modal.css';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Added isAdmin state

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill all the details');
      return;
    }

    try {
      const signup = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, isAdmin }), // Include isAdmin in the request
      });

      if (signup.status === 404) {
        toast.error('User already exists');
        return;
      }

      if (signup.status === 401) {
        toast.error('Please verify your email');
        openModal();
        return;
      }

      toast.success('Signup successful!');
      openModal();
    } catch (err) {
      toast.error('An error occurred while signing up');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const otpVerification = async (e) => {
    e.preventDefault();
    // Send OTP logic
  };

  return (
    <>
      <div className='loginSection pr-20 pl-20'>
        <div className='grid grid-cols-2'>
          <div className='LoginContent'>
            <h1>Create a new account</h1>
            <input
              type="name"
              placeholder="name"
              className='mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className='mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className='mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-600">Sign up as admin</span>
            </label>

            <br />
            <button className='underline  text-gray-600 ' onClick={openModal}>
              Forgot Password ?
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <h2 className="text-3xl font-semibold mb-2">Enter the OTP</h2>
              <p>Please enter the OTP sent to your email account</p>
              <input
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                type='text'
                placeholder='Enter OTP'
                className='w-full p-2'
              ></input>
              <button
                className='btn'
                onClick={async (e) => {
                  e.preventDefault();
                  console.log(otp);

                  try {
                    const register = await fetch('http://localhost:5000/user/verify', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ email, otp }),
                    });
                    toast.success('User created successfully');
                    window.location.href = '/login';
                  } catch (err) {
                    toast.error('An error occurred while sending OTP');
                  }
                }}
              >
                Done
              </button>
            </Modal>
            <button className='btn' onClick={handleSignup}>
              Sign Up
            </button>
            <br />
          </div>
          <div className='imgContent'>
            <img
              src='https://images.pexels.com/photos/4109078/pexels-photo-4109078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              width={'100%'}
              alt="Signup"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
