import {Link} from 'react-router-dom'
import React,{useState} from 'react'
import Modal from '../components/Modal'
import '../components/Modal.css'
import {useDispatch} from 'react-redux'
import {setUser} from '../store/localSlice'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email,setEmail]=useState('')
  const [otp,setOtp]=useState('') 
  const [password,setPassword]=useState('')
  const dispatch = useDispatch();

  const openModal = async() => {
   
    if(!email){
      toast.error("Please enter your email")
      return
    }
    let forgot=await fetch('http://localhost:5000/user/forgotpassword',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email})
    })

    let forgotMessage=await forgot.json()
    if(forgot.status===400){
      toast.error(forgotMessage.error)
      return
    }
    toast.success(forgotMessage.message)



    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function Login(e){
    e.preventDefault()

if(!email||!password){
  toast.error("Please fill all the details");
  return;
}
try{
  let login=await fetch('http://localhost:5000/user/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email,password})
  })
  let loginMessage=await login.json()
  if(login.status===400){
    toast.error(loginMessage.error)
    return

  }
  if(login.status===404){
    toast.error(loginMessage.error)
    window.location.href='/Signup'
    return
  }
 
  localStorage.setItem('token',loginMessage.token)
  loginMessage.user={...loginMessage.user,token:loginMessage.token}
  localStorage.setItem('user',JSON.stringify(loginMessage.user))
  dispatch(setUser(loginMessage.user))
  toast.success(loginMessage.message)
  if(loginMessage.user.role===1){
    window.location.href='/Dashboard'
    return
  }
  window.location.href='/'



  // window.location.href='/'
}catch(err){
  toast.error('An error occurred while logging in');
}
  }

  async function OtpVerify(e){
    e.preventDefault()
    if(!otp){
      toast.error("Please enter the otp")
      return
    }

    try{
      let otpVerify=await fetch('http://localhost:5000/user/forgotpassword',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,otp})
      })
      let otpMessage=await otpVerify.json()
      if(otpVerify.status===400){
        toast.error(otpMessage.error)
        return
      }
      toast.success(otpMessage.message)
      closeModal()
    }catch(err){
      toast.error('An error occurred while verifying otp');
    }

  }
  return (
    <>
    <ToastContainer/>
    <div className='loginSection pr-20 pl-20'>
     <div className='grid a grid-cols-2'>
      <div className='LoginContent'>
        <h1>Login to Pizza Monster</h1>
        <input
          type="email"
          placeholder="Email"
          className='mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className='mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to={"/Signup"}><span className=' text-red-800 bold cursor-pointer mr-5 hover:underline'>Create a new account</span></Link>
        <button className='underline  text-gray-600 'onClick={openModal}>Forgot Password ?</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-3xl font-semibold mb-2">Enter the OPT</h2>
        <p>Please enter the opt send into your email account</p>
        <input value={otp} onChange={e=>setOtp(e.target.value)} type='text' placeholder='Enter OTP' className='w-full p-2'></input>
        <button className='btn' onClick={OtpVerify}>Done</button>
      </Modal>
   <br></br>
      <button className='btn' onClick={Login}>Login</button>
      <br></br>
      
     </div>
     <div className='imgContent'>
      <img src='https://images.pexels.com/photos/4348786/pexels-photo-4348786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' width={'100%'}></img>
     </div>
      </div>

      
    </div>
   
    </>
  ) 
}

