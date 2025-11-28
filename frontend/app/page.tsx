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
        // FastAPI expects form-data for login
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        const res = await api.post('/api/v1/token', formData);
        localStorage.setItem('token', res.data.access_token);
        router.push('/dashboard');
      } else {
        // Register
        await api.post('/api/v1/register', { email, password, name: "User" });
        alert("Registered! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Error: Check credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-900 rounded border border-gray-800 w-96">
        <h1 className="text-2xl mb-4 font-bold text-blue-500">{isLogin ? 'Crypto Login' : 'Register'}</h1>
        <input className="w-full mb-4 p-2 bg-gray-800 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full mb-4 p-2 bg-gray-800 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 p-2 rounded hover:bg-blue-500">{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={() => setIsLogin(!isLogin)} className="mt-4 text-center text-sm cursor-pointer text-gray-400">
          {isLogin ? "Need account? Register" : "Have account? Login"}
        </p>
      </form>
    </div>
  );
}