// pages/index.js

import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Our Site</h1>
      </header>
      <main className="mt-8 flex flex-col items-center">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">Explore Our Platform</h2>
          <p className="mt-2 text-gray-600">Find out what we have to offer.</p>
          <Link href="/login">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
          </Link>
          <Link href="/register">
            <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">Register</button>
          </Link>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-700">Learn More About Us</h2>
          <p className="mt-2 text-gray-600">Discover our mission and values.</p>
          <Link href="/about">
            <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">About Us</button>
          </Link>
        </section>
      </main>
      <footer className="mt-8 text-gray-600">
        <p>&copy; 2024 Our Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
