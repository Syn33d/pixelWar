import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/register', {
        email,
        password,
        username,
      });
      alert('Registration successful');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register');
    }
  };

  return (
    <div className='auth-container'>
      <h1>Register</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
