import React from 'react'
import Breadcumbs from '../components/Breadcrumb'
const Contact = () => {
  function submit(){
    alert("Thank you for your message");
  }
  return (
   <>
  
   <h1 className='title2 mt-5'>Send Us Message</h1>
   <div className='contactSection grid grid-cols-2 mb-10'>
    <div className='form'>
      <form>
 
<input
            type="text"
            id="name"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            required
            className="mt-1 p-2 w-50 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder='Name*'
          />
 <input
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
            required
            className="mt-1 p-2 w-50 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder='Email*'
          /><br></br>
           <input
            type="tel"
            id="phone"
            name="phone"
            // value={formData.phone}
            // onChange={handleChange}
            className="mt-1 p-2 w-50 rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
          placeholder='Phone*'/>
          <textarea
            id="message"
            name="message"
            // value={formData.message}
            // onChange={handleChange}
            required
            rows="4"
            className="mt-3 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none "
            placeholder='Write a message'
          ></textarea>
<button onClick ={submit}type="submit" className="bg-red-600 submitBtn text-white p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          >Submit</button>
      </form>
    </div>
    <div className='contactImg flex justify-center '>
      <img src='https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/cons-img.jpg' width={"80%"}></img>
    </div>
    {/* map */}
    
   </div>\<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28568.66047744126!2d87.23822307431638!3d26.485286500000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef74767c91c905%3A0x2d67726c67fe2b73!2sOlive%20Cafe!5e0!3m2!1sen!2snp!4v1697171534207!5m2!1sen!2snp" width={"100%"} height={"450"}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
   </>
  )
}

export default Contact