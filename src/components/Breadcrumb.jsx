import React from 'react'
import { Link } from 'react-router-dom'
const BreadCrumb = ({label, url}) => {
  return (
    <>
    <div className='aboutSection grid grid-cols-2 pr-20 pl-20'>
      <div className='aboutContent'>
        <h1 className='aboutTitle'>{label}</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div className='breadCrumb'>

      <Link to={"/"} className="opacity-60 bread break1">
        Home
      </Link>
      <Link to={url} className="opacity-80 bread ">
        <span>{label} </span>
      </Link>
      <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt="" />
      <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/banner-leaf.png" alt="" />
      </div>
    </div>
    </>
  )
}

export default BreadCrumb