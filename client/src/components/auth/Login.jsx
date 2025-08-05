import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { login } from '../../api/auth';
import Input from '../common/Input';
import Button from '../common/Button';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Login = ({ onToggle }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // The login function now handles storing the token itself
      await login(formData);
      
      toast.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (error) {
      // Robust error handling for login failures
      if (typeof error === 'object' && error !== null) {
        // Example: if backend sends { "detail": "No active account found..." }
        const errorMessage = error.detail || Object.values(error).join(' ');
        toast.error(errorMessage || 'An unknown error occurred.');
      } else {
        toast.error(error || 'Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md p-8 space-y-6"
      key="login"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">Sign In</h2>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          Welcome back! Please enter your details.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          name="email" 
          type="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={handleChange}
          icon={<AtSymbolIcon className="h-5 w-5 text-gray-400" />}
        />
        <Input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
        />
        <Button type="submit" isLoading={isLoading}>Sign In</Button>
      </form>
      <p className="text-sm text-center text-text-secondary dark:text-dark-text-secondary">
        No account?{' '}
        <button onClick={onToggle} className="font-semibold text-primary dark:text-dark-primary hover:underline">
          Create one
        </button>
      </p>
    </motion.div>
  );
};

export default Login;