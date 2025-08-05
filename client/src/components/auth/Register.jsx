import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { register } from '../../api/auth';
import Input from '../common/Input';
import Button from '../common/Button';
import { UserIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Register = ({ onToggle }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      toast.success('Registration successful! Please sign in.');
      onToggle(); // Switch to the login form on success
    } catch (error) {
      // This is robust error handling. It will try to find a specific
      // error message from the backend response and display it.
      if (typeof error === 'object' && error !== null) {
        // Example: if backend sends { "email": ["user with this email already exists."] }
        const errorMessage = error.detail || Object.values(error).flat().join(' ');
        toast.error(errorMessage || 'An unknown error occurred.');
      } else {
        // Fallback for non-object errors
        toast.error(error || 'Registration failed. Please try again.');
      }
    } finally {
      // This ensures the loading spinner is turned off even if the API call fails
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md p-8 space-y-6"
      key="register"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">Create an Account</h2>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          Start your journey with us today.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          name="username" 
          type="text" 
          placeholder="Username" 
          value={formData.username} 
          onChange={handleChange}
          icon={<UserIcon className="h-5 w-5 text-gray-400" />}
        />
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
        <Button type="submit" isLoading={isLoading}>Create Account</Button>
      </form>
      <p className="text-sm text-center text-text-secondary dark:text-dark-text-secondary">
        Already have an account?{' '}
        <button onClick={onToggle} className="font-semibold text-primary dark:text-dark-primary hover:underline">
          Sign In
        </button>
      </p>
    </motion.div>
  );
};

export default Register;