import React, { useState, useEffect } from 'react';
import './App.css';
import Tasks from './Tasks';

const users = ['John', 'Mary'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignedUser, setAssignedUser] = useState(users[0]);
  const [showWarning, setShowWarning] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false, user: assignedUser }]);
      setNewTask('');
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  useEffect(() => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    document.querySelector('.progress-ring__circle').style.strokeDashoffset = offset;
  }, [progress]);

  return (
    <div className="App">
      <h1>Task List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setShowWarning(false);
          }}
          placeholder="Enter a new task"
        />
        <button onClick={addTask} className="add-btn" title="Add Task">+</button>
        <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} className="user-select">
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>

      {showWarning && <p className="warning-text">Please enter a task</p>}
      
      <Tasks
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        removeTask={removeTask}
      />

      <div className="task-counters">
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring__circle--background"
            stroke="#ddd"
            strokeWidth="10"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
          <circle
            className="progress-ring__circle"
            stroke="#4CAF50"
            strokeWidth="10"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
            style={{ strokeDasharray: '327', strokeDashoffset: '327' }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="progress-text-svg"
          >
            {completedTasks} / {totalTasks}
          </text>
        </svg>
      </div>
    </div>
  );
}

export default App;
