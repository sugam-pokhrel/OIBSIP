import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkouthandler } from '../store/authSlice';

import { toast } from 'react-toastify';
const Product = ({ _id, title, price, imageUrl, rating, quantity }) => {
  const dispatch = useDispatch();
  const [productPrice, setPrice] = useState(price);
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    setPrice(price * orderQuantity);
  }, [orderQuantity]);

  const increaseQuantity = () => {
    if (orderQuantity < quantity) {
      setOrderQuantity(orderQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (orderQuantity > 1) {
      setOrderQuantity(orderQuantity - 1);
    }
  };

  function handleClick() {
    console.log(orderQuantity);
    if(orderQuantity>5){
      toast.error("You can order maximum 5 pizzas at a time.")
      return
    }
    let formData = { name: title, id: _id, isProduct: true };
    formData.quantity = orderQuantity;
    console.log(formData);

    dispatch(checkouthandler({ amount: price * orderQuantity, formData }));
  }

  return (
    <div key={_id} className="product-card">
      <img src={imageUrl} alt={title} className="product-image" />
      <div className="product-details">
        <div className="product-title">{title}</div>
        <div className="product-price">₹{productPrice}</div>
      </div>

      <div className="px-6 py-4">
        <div className="flex space-x-2">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
    
        {quantity <= 1 ? (
          <p className="text-red text-lg font-bold">Out of Stock</p>
        ) : (
          <div className="order-options">
            <div className="quantity-selector">
              <label>Order Quantity:</label>
              <div className="quantity-controls">
                <button className="quantity-button" onClick={decreaseQuantity}>
                  -
                </button>
                <span>{orderQuantity}</span>
                <button className="quantity-button" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>
            <button className="order-button" onClick={handleClick}>
              Order Now
            </button>
            {quantity <= 5 && quantity >= 2 && (
          <p className="text-red text-lg font-bold">Hurry! Only {quantity} left </p>
        )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
