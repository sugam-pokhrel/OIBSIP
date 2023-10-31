import React from 'react'
import Breadcumbs from '../components/Breadcrumb'
const page = () => {
  return (
    <>
    
    <div className='about'>
      <h1>The Story About Pizza Monster</h1>
      <p>Lorem ipsum dolor sit amet,colur consectetur omni adipisicing elit, sed do eiusmod tempor incididunt labore et magna aliqua.</p>
    </div>
    <div className='grid grid-cols-2'>
      <div className='family'>
      <h1>Our Family Name</h1>
      <p>Lorem ipsum dolor sit amet, consectetur omni adipisicing elit, sed do eiusmod tempor sol incididunt ut labore et exercitation.</p>
      </div>
      <div className='journey'>
      <h1>Our Journey</h1>
      <p>Lorem ipsum dolor sit amet, consectetur omni adipisicing elit, sed do eiusmod tempor sol incididunt ut labore et exercitation.</p>
      </div>
    </div>
    <div className='grid grid-cols-2'>
      <div className='family'>
     <img src='https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/abt-img-1.jpg' width={"400px"}></img>
      </div>
      <div className='journey'>
      <h1>Food and Fun</h1>
      <p>Lorem ipsum dolor sit amet, consectetur omni adipisicing elit, sed do eiusmod tempor sol incididunt ut labore et exercitation.</p>
      </div>
    </div>
    </>
  )
}

export default page