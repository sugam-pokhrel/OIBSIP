import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  let [orders, setOrders] = React.useState([]);
  const token = useSelector((state) => state.user.token);

  React.useEffect(() => {
    console.log(token);
    fetch('http://localhost:5000/user/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    }).then((res) => {
      res.json().then((result) => {
        console.log(result);
        setOrders(result);
      });
    });
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {orders.reverse().map((order, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <p className="text-lg font-bold">{order.name}</p>
            <p className="text-gray-600">Amount: ${order.amount}</p>
            {/* You can add a status field to your order objects and display it here */}
            <p className="text-green-500">
              Status: {order.status ? order.status : 'Received'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
