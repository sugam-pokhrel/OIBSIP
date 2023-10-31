import React from 'react';
const Product = ({ title, price, imageUrl, rating }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
      <img src={imageUrl} alt={title} className="w-full" />
      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-red-700 text-lg font-bold">${price}</div>
      </div>
      
      <div className="px-6 py-4">
        <div className="flex space-x-2">
          {Array.from({ length: rating }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 2.293a1 1 0 011.414 0l1.292 1.292 1.293-1.293a1 1 0 111.414 1.414l-1.293 1.293 1.293 1.293a1 1 0 01-1.414 1.414L9 5.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 4.293 6.293 3a1 1 0 010-1.414zM10 4a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h6z"
                clipRule="evenodd"
              />
            </svg>
           
          ))}
         
        </div>
     <button className='orderBtn p-2 text-sm'>Order Now</button>
      </div> 
    </div>
  );
};

export default Product;
