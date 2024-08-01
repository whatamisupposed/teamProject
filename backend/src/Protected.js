import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/protected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage(response.data);
      } catch (error) {
        setMessage('Failed to fetch protected route');
      }
    };

    fetchProtected();
  }, []);

  return <div>{message}</div>;
};

export default Protected;
