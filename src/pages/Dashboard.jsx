import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashBoard = () => {
  const user = useSelector((state) => state.user);
  const [adminMessage, setAdminMessage] = useState('');
  const [orders, setOrders] = useState('');
  const [totalOrders, setTotalOrders] = useState([]);
  const [userData, setUserData] = useState([]);
  const [users, setUser] = useState('');
  const [pizza,setPizza]=useState([])
  const [pizzaBase,setPizzaBase]=useState([])
  const [pizzaCheese,setPizzaCheese]=useState([])
  const [pizzaSauce,setPizzaSauce]=useState([])
  const handleRefill = async (id,category,title) => {
   
 
    
  
    let admin = await fetch(`http://localhost:5000/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await admin.json();

    if(category==='pizzabase'){
      
      const pizzabase=await fetch('http://localhost:5000/pizzabase')
      const pizzaBaseData=await pizzabase.json()
      setPizzaBase(pizzaBaseData)
      return ;
    }
    if(category==='cheese'){
      
      const pizzaCheese=await fetch('http://localhost:5000/cheese')
      const pizzaCheeseData=await pizzaCheese.json()
      setPizzaCheese(pizzaCheeseData)
      return ;
    }
    if(category==='sauce'){
      
      const pizzaSauce=await fetch('http://localhost:5000/sauce')
      const pizzaSauceData=await pizzaSauce.json()
      setPizzaSauce(pizzaSauceData)
      return ;
    }
    if(category==='pizza'){
        console.log(category)
        
        const pizza=await fetch('http://localhost:5000/pizza')

        const pizzaData=await pizza.json()
        
        setPizza(pizzaData)
        return ;
      }


    

  
    

  }

  // State to store product data
  const [adm, setAdm] = useState(false);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'users', 'pizzabases', 'cheese', 'sauce', or 'pizzas'

  const isadmin = async () => {
    let admin = await fetch('http://localhost:5000/user/isadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: user.token }),
    });

    let adminMessage = await admin.json();
    if (admin.status !== 401) {
      setAdm(true);
      setAdminMessage(adminMessage.hello);
      setOrders(adminMessage.orders);
      setUser(adminMessage.users);
      setUserData(adminMessage.usersData);
      setTotalOrders(adminMessage.totalOrders);
    } else {
      setAdm(false);
    }
  };

  const fetchProducts = async () => {
    // Fetch product data here from your API or server
    const response = await fetch('http://localhost:5000/pizza');
    const productData = await response.json();
    setPizza(productData);
    const pizzabase=await fetch('http://localhost:5000/pizzabase')
    const pizzaBaseData=await pizzabase.json()
    setPizzaBase(pizzaBaseData)
    const pizzaCheese=await fetch('http://localhost:5000/cheese')
    const pizzaCheeseData=await pizzaCheese.json()
    setPizzaCheese(pizzaCheeseData)
    const pizzaSauce=await fetch('http://localhost:5000/sauce')
    const pizzaSauceData=await pizzaSauce.json()
    setPizzaSauce(pizzaSauceData)
    console.log(pizzaBaseData,pizzaCheeseData,pizzaSauceData,pizza)
    

    
  };
  function handleOrderStatusChange(e) {
    console.log(e.target.value);
  }

  useEffect(() => {
    isadmin();
    fetchProducts(); // Fetch product data when the component mounts
  }, []);

  if (adm === false) {
    return <></>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">PIZZAMONSTER'S Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div onClick={() => setActiveTab('users')} className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-700 text-sm">Total Users</div>
            <div className="text-2xl font-semibold">{users}</div>
          </div>
          <div onClick={() => setActiveTab('orders')} className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-700 text-sm">Total Orders</div>
            <div className="text-2xl font-semibold">{orders}</div>
          </div>
          <div onClick={() => setActiveTab('revenue')} className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-700 text-sm">Revenue</div>
            <div className="text-2xl font-semibold">{adminMessage}</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn ${activeTab === 'orders' ? 'active' : ''}`}
          >
            Orders
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`btn ${activeTab === 'users' ? 'active' : ''}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('pizzabases')}
            className={`btn ${activeTab === 'pizzabases' ? 'active' : ''}`}
          >
            Pizza Bases
          </button>
          <button
            onClick={() => setActiveTab('cheese')}
            className={`btn ${activeTab === 'cheese' ? 'active' : ''}`}
          >
            Cheese
          </button>
          <button
            onClick={() => setActiveTab('sauce')}
            className={`btn ${activeTab === 'sauce' ? 'active' : ''}`}
          >
            Sauce
          </button>
          <button
            onClick={() => setActiveTab('pizzas')}
            className={`btn ${activeTab === 'pizzas' ? 'active' : ''}`}
          >
            Pizzas
          </button>
        </div>

        {activeTab === 'orders' && (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Orders</h2>

    <div className="order-list">
      {totalOrders.slice().reverse().map((order) => (
        <div key={order._id} className="order-item">
          <div className="order-name">{order.name}</div>
          <div className="order-user">User: {order.user}</div>
          <div className="order-amount">Amount: Rs.{order.amount}</div>
          <div className="order-status-dropdown">
  {/* Dropdown for selecting order status */}
  <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700">
    Select Order Status:
  </label>
  <div className="mt-1 relative rounded-md shadow-sm">
    <select
      id="orderStatus"
      name="orderStatus"
      className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      onChange={handleOrderStatusChange}
      
    >
     
      <option value="Received">Received</option>
      <option value="In Kitchen">In Kitchen</option>
      <option value="Sent to Delivery">Sent to Delivery</option>
    </select>
  </div>
</div>
        </div>
        
      ))}
    </div>

  </div>
)}

        {activeTab === 'users' && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>

            <div className="user-list">
              {userData.map((user) => (
                <div key={user._id} className="user-item">
                  <div className="user-email">{user.email}</div>
                  {/* You can add more user information here */}
                </div>
              ))}
            </div>
          </div>
        )}

{activeTab === 'pizzabases' && (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Pizza Bases</h2>
    <div className="product-list">
      {pizzaBase.map((base) => (
        <div key={base._id} className="product-item">
          <div className="product-name">{base.name}</div>
          <div className="product-quantity">Quantity: {base.quantity}</div>
          <button className="refill-button" onClick={() => handleRefill(base._id,'pizzabase',base.name)}>
            Refill
          </button>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'cheese' && (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Cheese</h2>
    <div className="product-list">
      {pizzaCheese.map((cheese) => (
        <div key={cheese._id} className="product-item">
          <div className="product-name">{cheese.name}</div>
          <div className="product-quantity">Quantity: {cheese.quantity}</div>
          <button className="refill-button" onClick={() => handleRefill(cheese._id,'cheese',cheese.name)}>
            Refill
          </button>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'sauce' && (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Sauce</h2>
    <div className="product-list">
      {pizzaSauce.map((sauce) => (
        <div key={sauce._id} className="product-item">
          <div className="product-name">{sauce.name}</div>
          <div className="product-quantity">Quantity: {sauce.quantity}</div>
          <button className="refill-button" onClick={() => handleRefill(sauce._id,'sauce',sauce.name)}>
            Refill
          </button>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'pizzas' && (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Pizzas</h2>
    <div className="product-list">
      {pizza.map((pizza) => (
        <div key={pizza._id} className="product-item">
          <div className="product-name">{pizza.title}</div>
          <div className="product-quantity">Quantity: {pizza.quantity}</div>
          <button className="refill-button" onClick={() => handleRefill(pizza._id,'pizza',pizza.title)}>
            Refill
          </button>
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default DashBoard;
