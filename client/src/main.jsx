import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Loading...');

  const loadTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
      setStatus('Connected to API');
    } catch {
      setStatus('API connected, but MongoDB may not be running');
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
  };

  return (
    <main className="page">
      <section className="card">
        <p className="badge">Single Docker Image</p>
        <h1>MERN Monolithic Task App</h1>
        <p className="subtitle">React frontend + Express backend in one app. No Docker Compose.</p>
        <div className="status">{status}</div>
        <form onSubmit={addTask} className="form">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" />
          <button>Add Task</button>
        </form>
        <div className="list">
          {tasks.length === 0 ? <p>No tasks yet.</p> : tasks.map(task => (
            <div className="task" key={task._id}>
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
