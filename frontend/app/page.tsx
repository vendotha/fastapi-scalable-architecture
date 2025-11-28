'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // 🟢 FIX 1: Login requires Form Data, NOT JSON.
        // We must map 'email' to 'username' because FastAPI expects 'username'.
        const formData = new URLSearchParams();
        formData.append('username', email); 
        formData.append('password', password);

        // 🟢 FIX 2: Explicitly set the header to x-www-form-urlencoded
        const res = await api.post('/api/v1/token', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        localStorage.setItem('token', res.data.access_token);
        router.push('/dashboard');
      } else {
        // Register (This is JSON)
        // 🟢 FIX 3: Ensure email is valid format (e.g. user@test.com)
        await api.post('/api/v1/register', { email, password, name: "User" });
        alert("Registered! Please login.");
        setIsLogin(true);
      }
    } catch (err: any) {
      console.error("Full Error:", err);
      // 🟢 FIX 4: Alert the EXACT validation error from the backend
      const serverError = err.response?.data?.detail;
      if (Array.isArray(serverError)) {
        // Pydantic validation errors are arrays
        alert(`Validation Error: ${serverError[0].msg} in field ${serverError[0].loc[1]}`);
      } else {
        alert(serverError || "Login failed. Check console.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-900 rounded border border-gray-800 w-96">
        <h1 className="text-2xl mb-4 font-bold text-blue-500">{isLogin ? 'Crypto Login' : 'Register'}</h1>
        
        <label className="text-xs text-gray-400">Email (Must be valid format)</label>
        <input 
          className="w-full mb-4 p-2 bg-gray-800 rounded border border-gray-700" 
          placeholder="admin@test.com" 
          type="email"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        
        <label className="text-xs text-gray-400">Password</label>
        <input 
          className="w-full mb-4 p-2 bg-gray-800 rounded border border-gray-700" 
          type="password" 
          placeholder="password123" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        
        <button className="w-full bg-blue-600 p-2 rounded hover:bg-blue-500 font-bold">
          {isLogin ? 'Login' : 'Register'}
        </button>
        
        <p onClick={() => setIsLogin(!isLogin)} className="mt-4 text-center text-sm cursor-pointer text-gray-400 hover:text-white transition">
          {isLogin ? "Need account? Register" : "Have account? Login"}
        </p>
      </form>
    </div>
  );
}