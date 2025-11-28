'use client';
import { useEffect, useState } from 'react';
import api from '@/utils/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/v1/tasks/');
      setTasks(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!title) return;
    await api.post('/api/v1/tasks/', { title, description: "Crypto analysis" });
    setTitle('');
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">Analyst Dashboard</h1>
      <div className="flex gap-4 mb-8">
        <input 
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white" 
          placeholder="New Task / Note" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <button onClick={addTask} className="bg-green-600 px-4 py-2 rounded">Add</button>
      </div>
      <div className="grid gap-4">
        {tasks.map((t: any) => (
          <div key={t.id} className="p-4 bg-gray-900 border border-gray-800 rounded">
            {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}