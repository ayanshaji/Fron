import React, { useState } from 'react'; 
import { FaUser, FaLockOpen } from "react-icons/fa";
import './Login.css';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Tost.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3004/login', {
        username,
        password,
        role
      });
      toast.success(res.data.message);
      onLoginSuccess(role);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong, please try again.');
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3004/forgot-password', { email });
      toast.success(res.data.message);
      setForgotPassword(false); // Close the form on success
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong, please try again.');
      }
    }
  };

  return (
    <div className='wrapper'>
      {!forgotPassword ? (
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="role-toggle">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              Admin
            </label>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLockOpen className='icon' />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#" onClick={() => setForgotPassword(true)}>Forgot password?</a>
          </div>

          <Button type="submit">Login</Button>

          {role !== 'admin' && (
            <div className="register-link">
              <p>Don't have an account? <a href='/sign'>Register</a></p>
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <h1>Reset Password</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Send Reset Link</Button>
          <Button onClick={() => setForgotPassword(false)} style={{ marginTop: '10px' }}>Back to Login</Button>
        </form>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        newestOnTop={true}
        theme="dark"
        closeButton={false}
      />
    </div>
  );
};

export default Login;
