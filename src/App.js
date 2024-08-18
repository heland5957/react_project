import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
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
      <h1>Tasker</h1>
      <p>by Helijao</p>      
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
      </div>
      {showWarning && <p className="warning-text">Please enter a task</p>}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            {task.completed ? (
              <button onClick={() => toggleTaskCompletion(index)} className="undo-btn" title="Undo Complete">↩</button>
            ) : (
              <button onClick={() => toggleTaskCompletion(index)} className="complete-btn" title="Complete Task">✔</button>
            )}
            <button onClick={() => removeTask(index)} className="remove-btn" title="Remove Task">✖</button>
          </li>
        ))}
      </ul>
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
