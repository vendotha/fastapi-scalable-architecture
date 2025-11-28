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

  const deleteTask = async (id: number) => {
    if(!confirm("Delete this strategy note?")) return;
    try {
      await api.delete(`/api/v1/tasks/${id}`);
      fetchTasks(); // Refresh list
    } catch (err) { alert("Failed to delete"); }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-500 tracking-wider">CRYPTODESK <span className="text-gray-500 text-sm">| Analyst Terminal</span></h1>
        
        <div className="flex gap-4 mb-8 bg-gray-900 p-4 rounded-lg border border-gray-800">
          <input 
            className="flex-1 p-3 rounded bg-black border border-gray-700 text-white focus:border-blue-500 outline-none" 
            placeholder="Enter new trading strategy or note..." 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />
          <button onClick={addTask} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-bold transition">ADD ENTRY</button>
        </div>

        <div className="grid gap-4">
          {tasks.map((t: any) => (
            <div key={t.id} className="p-5 bg-gray-900 border border-gray-800 rounded flex justify-between items-center hover:border-gray-600 transition">
              <div>
                <span className="text-green-400 font-mono text-xs mr-3">ID: {t.id}</span>
                <span className="text-lg">{t.title}</span>
              </div>
              <button 
                onClick={() => deleteTask(t.id)}
                className="text-red-500 hover:text-red-400 font-mono text-sm border border-red-900 bg-red-900/20 px-3 py-1 rounded"
              >
                DELETE
              </button>
            </div>
          ))}
          {tasks.length === 0 && <p className="text-gray-500 text-center mt-10">No active strategies found.</p>}
        </div>
      </div>
    </div>
  );
}