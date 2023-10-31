import React from 'react'
import './App.css'
import Navbar from '../src/components/Navbar'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Admin from './pages/Admin';
import DashBoard  from './pages/Dashboard';
import Profile from './pages/Profile';

// import Footer from '../src/components/Footer';
function App() {

  return (
    <>
    <Provider store={store}>
      {window.location.pathname==="/Dashboard"?null:<Navbar></Navbar>}
 
   
    <Routes>
    
    <Route path='' element={<Home/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/Contact' element={<Contact/>}/>
    <Route path='/Shop' element={<Shop/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Signup' element={<SignUp/>}/>
    <Route path='/Profile' element={<Profile/>}/>
    {/* <Route path="/Cart" element={<Cart/>} /> */}

    {/* <Footer></Footer> */}
  </Routes>
  
  <Routes>
    <Route path='/DashBoard' element={<DashBoard/>}/>
    <Route path='/Admin' element={<Admin/>}/>
  </Routes>
  </Provider>
    </>
  )
}

export default App
