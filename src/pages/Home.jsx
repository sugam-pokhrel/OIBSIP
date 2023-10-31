import React, { useEffect, useState } from 'react'
import '../App.css'
import CustomPizzaModal from '../components/CustomPizzaModal'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch} from "react-redux";
import { logout } from "../store/localSlice";
function Home() {
  let user=useSelector((state)=>state.user)
  useState(()=>{
    if(!user){
     
    }else{
      window.location.href="/Shop"
    }

  },[user])


  
  // const [isModalOpen, setIsModalOpen] = React.useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  // const handlePizzaOrder = (orderData) => {
  //   console.log('Custom Pizza Order:', orderData);
  // };

  return (
    <>
      <div className='mainSection pr-20 pl-20'>
    <div className=' grid  grid-cols-2 xs:grid-cols-1'>
      <div className='mainContent'>
        <h1 className='title'>
        Handmade, With an Extra Pinch of Love
        </h1>
        <p className='para'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <Link to={'/Shop'} >
          <button className='orderBtn ' onClick={console.log('clicked')}>Order Now</button>
          </Link>
      </div>
      <div className='imgSection'>
        <img src='https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/banner-img.png' className='img1'/>
        <img src='https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/banner-img-bottom.png' width={"300px"} className='img2'></img>
      </div>
    </div>
    </div> 
    <div className='customPizza grid grid-cols-2 gap-5 p-20'>
      <div className='imgContent'>
       <img src='https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/daily-fresh.png'/>
      </div>
     
    </div>
    </>
  )
}

export default Home
