"use client"


import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13.0.0+


export default function Home() {
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter(); // Initialize useRouter


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Disable form fields and change button text
    setFullName('');
    setMobileNo('');
    setEmail('');
    setPassword('');
    setDob('');
    setIsRegistering(true);

    // Validate mandatory fields
    if (!fullName || !mobileNo || !email || !password || !dob) {
      toast.error('All fields are mandatory');
      setIsRegistering(false);
      return;
    }

    // Validate email format
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email format');
      setIsRegistering(false);
      return;
    }

    // Validate mobile number format
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobileNo)) {
      toast.error('Mobile number should be 10 digits');
      setIsRegistering(false);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      fullName,
      mobileNo,
      email,
      password: hashedPassword, // Use hashed password
      dob
    };

    // Clear previous errors if any
    toast.dismiss();

    try {
      const response = await fetch('/api/mongo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const responseData = await response.json();

      if (response.ok && responseData.ok) {
        console.log('User registered successfully!');
        toast.success('User registered successfully!');
        router.push('/login');

      } else {
        console.error('Failed to register user');
        toast.error(responseData.error); // Set error message received from API
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Internal Server Error'); // Set generic error message for internal server errors
    } finally {
      // Enable form fields and reset button text
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <ToastContainer /> {/* Toast container for displaying toast messages */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full-name" className="sr-only">
                Full Name
              </label>

              <input
                id="full-name"
                name="full-name"
                type="text"
                autoComplete="full-name"
                required
                disabled={isRegistering} // Disable field when registering
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mobile-no" className="sr-only">
                Mobile Number
              </label>

              <input
                id="mobile-no"
                name="mobile-no"
                type="tel"
                autoComplete="mobile-number"
                required
                disabled={isRegistering} // Disable field when registering
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
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
                disabled={isRegistering} // Disable field when registering
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                autoComplete="new-password"
                required
                disabled={isRegistering} // Disable field when registering
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dob" className="sr-only">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                disabled={isRegistering} // Disable field when registering
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isRegistering} // Disable button when registering
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </button>
          </div>
          <div className="text-center mt-4">
            Already have an Account?
            <Link href="/login">
              <span className="text-indigo-600 hover:underline cursor-pointer">login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

