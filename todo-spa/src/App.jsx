import { useState } from "react";
import { Plus, Check, Trash2, Calendar } from "lucide-react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newTask = {
      id: Date.now(),
      text: task,
      time: timeString,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="app-container">
      <div className="wrapper">
        
        {/* Header */}
        <div className="header-section animate-fade-in">
          <h1 className="app-title">Task Flow</h1>
          <p className="app-subtitle">Organize your day, accomplish your goals</p>
        </div>

        {/* Stats Card */}
        {totalCount > 0 && (
          <div className="stats-card">
            <div className="stats-content">
              <div className="stats-left">
                <div className="stats-icon-box">
                  <Calendar className="icon-white" />
                </div>
                <div>
                  <p className="stats-label">Today's Progress</p>
                  <p className="stats-value">{completedCount} / {totalCount}</p>
                </div>
              </div>
              <div className="stats-right">
                <div className="percentage-text">
                  {Math.round(progressPercentage)}%
                </div>
                <p className="stats-label-sm">Complete</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="main-card">
          
          {/* Input Section */}
          <div className="input-group">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What would you like to accomplish?"
              className="task-input"
            />
            <button onClick={addTask} className="add-btn">
              <Plus className="icon-sm" />
            </button>
          </div>

          {/* Tasks List */}
          <div className="tasks-list custom-scrollbar">
            {tasks.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon-box">
                  <Check className="icon-large" />
                </div>
                <p className="empty-text">No tasks yet</p>
                <p className="empty-subtext">Add your first task to get started!</p>
              </div>
            )}

            {tasks.map((t, index) => (
              <div
                key={t.id}
                className={`task-item ${t.completed ? "completed" : ""}`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => toggleTask(t.id)}
              >
                <div className="task-row">
                  {/* Checkbox */}
                  <div className={`checkbox ${t.completed ? "checked" : ""}`}>
                    {t.completed && <Check className="icon-xs" strokeWidth={3} />}
                  </div>

                  {/* Task Content */}
                  <div className="task-details">
                    <p className="task-text">{t.text}</p>
                    <p className="task-meta">
                      <span className="dot"></span>
                      {t.time}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => deleteTask(t.id, e)}
                    className="delete-btn"
                  >
                    <Trash2 className="icon-delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="footer-text">
          Click tasks to mark complete • Hover to delete
        </p>
      </div>
    </div>
  );
}

export default App;