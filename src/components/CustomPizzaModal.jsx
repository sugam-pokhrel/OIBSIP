import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkouthandler } from '../store/authSlice';
import {toast} from 'react-toastify';

const CustomPizzaModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    pizzaTypeBase: '',
    pizzaTypeSauce: '',
    pizzaTypeCheese: '',
  });
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handlePizzaChange = (event) => {
    console.log(event.target.name+event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    formData.quantity=quantity;
    formData.name='Custom Pizza'
    if(!isFormDataValid){
      toast.error("Please select all pizza options.")
      return
    }
    if(quantity>5){
      toast.error("You can order maximum 5 pizzas at a time.")
      return
    }

    if (formData.pizzaTypeBase && formData.pizzaTypeSauce && formData.pizzaTypeCheese) {
      try {
        
        dispatch(checkouthandler({ amount: 300, formData }));
      } catch (err) {
        console.log('Error occurred:', err);
      }
    } else {
      console.log('Please select all pizza options.');
    }
  };

  const isFormDataValid =
    formData.pizzaTypeBase !== '' && formData.pizzaTypeSauce !== '' && formData.pizzaTypeCheese !== '';

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}
    >
      <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
      <div className="bg-white p-4 rounded-lg z-10">
        <h2 className="text-xl font-semibold m-4">Create your own pizza</h2>
        <form onSubmit={handleSubmit}>
          <div className="m-4">
            <label htmlFor="pizzaTypeBase" className="block text-sm font-medium text-xl text-gray-700 mt-4 mb-2">
              Pizza Base
            </label>
            <select
              id="pizzaTypeBase"
              name="pizzaTypeBase"
              value={formData.pizzaTypeBase}
              onChange={handlePizzaChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Select a Pizza Base Type</option>
              <option value="Pepperoni">Pepperoni</option>
              <option value="Margherita">Margherita</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Supreme">Supreme</option>
              {/* Add more pizza types here */}
            </select>

            <label htmlFor="pizzaTypeSauce" className="block text-sm font-medium text-xl text-gray-700 mt-4 mb-2">
              Pizza Sauce
            </label>
            <select
              id="pizzaTypeSauce"
              name="pizzaTypeSauce"
              value={formData.pizzaTypeSauce}
              onChange={handlePizzaChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Select a Pizza Sauce Type</option>
              <option value="Spicy Red Sauce">Spicy Red Sauce</option>
              <option value="BBQ Sauce">BBQ Sauce</option>
              <option value="Buffalo Sauce">Buffalo Sauce</option>
              <option value="Marinara Sauce">Marinara Sauce</option>
              <option value="Chocolate Sauce">Chocolate Sauce</option>
              {/* Add more pizza sauces here */}
            </select>

            <label htmlFor="pizzaTypeCheese" className="block text-sm font-medium text-xl text-gray-700 mt-4 mb-2">
              Pizza Cheese
            </label>
            <select
              id="pizzaTypeCheese"
              name="pizzaTypeCheese"
              value={formData.pizzaTypeCheese}
              onChange={handlePizzaChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Select a Pizza Cheese Type</option>
              <option value="MOZZARELLA">MOZZARELLA</option>
              <option value="AGED HAVARTI">AGED HAVARTI</option>
              <option value="GORGONZOLA">GORGONZOLA</option>
              {/* Add more cheese types here */}
            </select>

            <button className="underline rounded p-2 mt-4 ml-2" onClick={closeModal}>
              Close
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover-bg-red-600"
            >
              Order Now
            </button>
          
           
  <button style={{marginLeft:"20px"}}
    type="button"
    className="px-3 py-2 bg-gray-200 rounded-md"
    onClick={decreaseQuantity}
  >
    -
  </button>
  <span className="mx-3 font-semibold text-xl">{quantity}</span>
  <button
    type="button"
    className="px-3 py-2 bg-gray-200 rounded-md"
    onClick={increaseQuantity}
  >
    +
  </button>

            <div className={`order-value ${isFormDataValid ? 'valid' : 'invalid'}`}>
              Your order value: ${isFormDataValid ? 300*quantity : 0}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomPizzaModal;
