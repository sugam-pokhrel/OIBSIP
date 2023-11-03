import React, { useEffect, useState } from 'react';

const Error = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown === 1) {
        window.location.href = '/';
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdown]);

  const errorContainerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const errorHeadingStyle = {
    fontSize: '24px',
    color: '#ff0000',
  };

  const errorMessageStyle = {
    fontSize: '18px',
    margin: '10px 0',
  };

  return (
    <div style={errorContainerStyle}>
      <h1 style={errorHeadingStyle}>Sorry, an error occurred</h1>
      <p style={errorMessageStyle}>We could not proceed with your request. Error 404.</p>
      <p>You will be redirected in {countdown} seconds.</p>
    </div>
  );
}

export default Error;
