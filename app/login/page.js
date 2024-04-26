"use client"
import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13.0.0+

export default function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loggingIn, setLoggingIn] = useState(false);
 const router = useRouter(); // Initialize useRouter

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    const userData = {
      email,
      password
    };

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const responseData = await response.json();

      if (response.ok && responseData.ok) {
        console.log('User logged in successfully!');
        toast.success('Login successful!');
        // Navigate to /crud upon successful login
        router.push('/crud');
      } else {
        console.error('Failed to log in:', responseData.error);
        toast.error(responseData.error || 'Failed to log in');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Internal Server Error');
    } finally {
      setLoggingIn(false);
    }
 };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <ToastContainer />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loggingIn}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={loggingIn}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={loggingIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loggingIn ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="text-center mt-4">
            Don't have an account?{' '}
            <Link href="/register">
              <span className="text-indigo-600 hover:underline cursor-pointer">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
 );
}
