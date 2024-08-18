import React from 'react';

function Tasks({ tasks, toggleTaskCompletion, removeTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.text} - <strong>{task.user}</strong>
          </span>
          <div className="button-group">
            {!task.completed && (
              <button onClick={() => toggleTaskCompletion(index)} className="complete-btn" title="Complete Task">✔</button>
            )}
            {task.completed && (
              <button onClick={() => toggleTaskCompletion(index)} className="undo-btn" title="Undo Complete">↩</button>
            )}
            <button onClick={() => removeTask(index)} className="remove-btn" title="Remove Task">✖</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
