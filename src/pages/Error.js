import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Error = () => {
  const history = useHistory();
  const [countdown, setCountdown] = useState(5);

  // Automatically redirect after 5 seconds
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown === 1) {
        history.push('/');
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdown, history]);

  return (
    <div>
      <p>Sorry, we could not proceed with your request. Error 404.</p>
      <p>You will be redirected in {countdown} seconds.</p>
    </div>
  );
}

export default Error;
