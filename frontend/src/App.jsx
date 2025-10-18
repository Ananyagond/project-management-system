import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit2, Sparkles, Calendar, Clock, Zap, Target, TrendingUp } from 'lucide-react';

// API Service
const API_URL = 'http://localhost:5000/api';

const api = {
  projects: {
    getAll: () => fetch(`${API_URL}/projects`).then(r => r.json()),
    create: (data) => fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data) => fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id) => fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' }).then(r => r.json())
  },
  tasks: {
    getByProject: (projectId) => fetch(`${API_URL}/tasks/project/${projectId}`).then(r => r.json()),
    create: (data) => fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id, data) => fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    updateStatus: (id, data) => fetch(`${API_URL}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id) => fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' }).then(r => r.json())
  },
  ai: {
    summarize: (projectId) => fetch(`${API_URL}/ai/summarize/${projectId}`).then(r => r.json()),
    ask: (data) => fetch(`${API_URL}/ai/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json())
  }
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Project Form
const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');

  const handleSubmit = () => {
    if (name && description) {
      onSubmit({ name, description });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Enter project name..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
          placeholder="Describe your project..."
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button 
          onClick={onCancel} 
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {project ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

// Task Form
const TaskForm = ({ task, projectId, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'To Do');

  const handleSubmit = () => {
    if (title && description) {
      onSubmit({ title, description, status, projectId });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Enter task title..."
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
          placeholder="Describe the task..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="flex gap-2 justify-end">
        <button 
          onClick={onCancel} 
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {task ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

// AI Assistant
const AIAssistant = ({ projectId, tasks }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQA, setShowQA] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await api.ai.summarize(projectId);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleAsk = async () => {
    if (!selectedTask || !question) return;
    setLoading(true);
    try {
      const result = await api.ai.ask({ taskId: selectedTask, question });
      setAnswer(result.answer);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <Sparkles className="text-white" size={18} />
        </div>
        <h3 className="font-semibold text-gray-800">AI Assistant</h3>
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 transition-all transform hover:scale-105"
        >
          {loading ? '⏳ Loading...' : '✨ Summarize'}
        </button>
        <button
          onClick={() => setShowQA(!showQA)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          💬 Ask Question
        </button>
      </div>

      {summary && (
        <div className="bg-white border border-purple-200 rounded-lg p-3 mb-3 animate-slideDown">
          <p className="text-sm text-gray-700">{summary}</p>
        </div>
      )}

      {showQA && (
        <div className="border-t border-purple-200 pt-3 animate-slideDown">
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a task...</option>
            {tasks.map(task => (
              <option key={task._id} value={task._id}>{task.title}</option>
            ))}
          </select>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
          {answer && (
            <div className="bg-white border border-blue-200 rounded-lg p-3 mt-2 animate-slideDown">
              <p className="text-sm text-gray-700">{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main App
export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadTasks(selectedProject._id);
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    const result = await api.projects.getAll();
    if (result.success) setProjects(result.data);
  };

  const loadTasks = async (projectId) => {
    const result = await api.tasks.getByProject(projectId);
    if (result.success) setTasks(result.data);
  };

  const handleCreateProject = async (data) => {
    const result = await api.projects.create(data);
    if (result.success) {
      await loadProjects();
      setShowProjectModal(false);
    }
  };

  const handleUpdateProject = async (data) => {
    const result = await api.projects.update(editingProject._id, data);
    if (result.success) {
      await loadProjects();
      if (selectedProject?._id === editingProject._id) {
        setSelectedProject(result.data);
      }
      setShowProjectModal(false);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project and all its tasks?')) {
      await api.projects.delete(id);
      await loadProjects();
      if (selectedProject?._id === id) {
        setSelectedProject(null);
        setTasks([]);
      }
    }
  };

  const handleCreateTask = async (data) => {
    const result = await api.tasks.create(data);
    if (result.success) {
      await loadTasks(selectedProject._id);
      setShowTaskModal(false);
    }
  };

  const handleUpdateTask = async (data) => {
    const result = await api.tasks.update(editingTask._id, data);
    if (result.success) {
      await loadTasks(selectedProject._id);
      setShowTaskModal(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      await api.tasks.delete(id);
      await loadTasks(selectedProject._id);
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(column);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      // Show confetti when moving to Done
      if (status === 'Done') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      
      await api.tasks.updateStatus(draggedTask._id, { status });
      await loadTasks(selectedProject._id);
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const columns = [
    { 
      name: 'To Do', 
      icon: Target,
      color: 'from-red-400 to-orange-400',
      bgColor: 'bg-gradient-to-br from-red-50 to-orange-50', 
      borderColor: 'border-red-200',
      glowColor: 'shadow-red-200'
    },
    { 
      name: 'In Progress', 
      icon: Zap,
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50', 
      borderColor: 'border-blue-200',
      glowColor: 'shadow-blue-200'
    },
    { 
      name: 'Done', 
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-400',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50', 
      borderColor: 'border-green-200',
      glowColor: 'shadow-green-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                width: '10px',
                height: '10px',
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white bg-opacity-95 backdrop-blur-md shadow-lg relative z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Project Management
              </h1>
              <p className="text-xs text-gray-500">Drag, drop, and get things done</p>
            </div>
          </div>
          <button
            onClick={() => setShowProjectModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm font-medium"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 flex gap-6 relative z-10">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Projects</h2>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                {projects.length}
              </span>
            </div>
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
              {projects.map(project => (
                <div
                  key={project._id}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                    selectedProject?._id === project._id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-102'
                      : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-sm truncate ${selectedProject?._id === project._id ? 'text-white' : 'text-gray-800'}`}>
                        {project.name}
                      </h3>
                      <p className={`text-xs mt-1 truncate ${selectedProject?._id === project._id ? 'text-white text-opacity-90' : 'text-gray-500'}`}>
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProject(project);
                          setShowProjectModal(true);
                        }}
                        className={`p-1.5 rounded-lg transition-all ${
                          selectedProject?._id === project._id 
                            ? 'hover:bg-white hover:bg-opacity-20' 
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project._id);
                        }}
                        className={`p-1.5 rounded-lg transition-all ${
                          selectedProject?._id === project._id 
                            ? 'hover:bg-white hover:bg-opacity-20' 
                            : 'hover:bg-red-100 text-red-600'
                        }`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {selectedProject ? (
            <>
              {/* Project Info */}
              <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl shadow-lg p-5 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h2>
                <p className="text-gray-600 mt-1">{selectedProject.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    {new Date(selectedProject.createdDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                    <Clock size={14} />
                    {tasks.length} tasks
                  </span>
                </div>
              </div>

              {/* AI Assistant */}
              <AIAssistant projectId={selectedProject._id} tasks={tasks} />

              {/* Kanban Board */}
              <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl shadow-lg p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-800">Board</h3>
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm font-medium"
                  >
                    <Plus size={16} />
                    Add Card
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {columns.map((column) => {
                    const ColumnIcon = column.icon;
                    return (
                      <div
                        key={column.name}
                        className={`rounded-xl ${column.bgColor} p-4 min-h-[600px] transition-all duration-300 ${
                          dragOverColumn === column.name 
                            ? `ring-4 ring-opacity-50 ${column.borderColor} scale-102 ${column.glowColor} shadow-2xl` 
                            : 'border-2 border-transparent'
                        }`}
                        onDragOver={(e) => handleDragOver(e, column.name)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, column.name)}
                      >
                        <div className={`flex items-center justify-between mb-4 p-3 rounded-xl bg-gradient-to-r ${column.color} shadow-md`}>
                          <div className="flex items-center gap-2">
                            <ColumnIcon className="text-white" size={18} />
                            <h4 className="font-bold text-white text-sm">{column.name}</h4>
                          </div>
                          <span className="bg-white bg-opacity-90 text-gray-800 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                            {getTasksByStatus(column.name).length}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {getTasksByStatus(column.name).map((task, index) => (
                            <div
                              key={task._id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, task)}
                              onDragEnd={handleDragEnd}
                              className={`bg-white rounded-xl shadow-md p-4 cursor-move border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 group ${
                                draggedTask?._id === task._id ? 'opacity-50 scale-95' : ''
                              }`}
                              style={{
                                animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                              }}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-bold text-sm text-gray-800 flex-1 pr-2 group-hover:text-blue-600 transition-colors">
                                  {task.title}
                                </h5>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => {
                                      setEditingTask(task);
                                      setShowTaskModal(true);
                                    }}
                                    className="p-1.5 hover:bg-blue-100 rounded-lg transition-all"
                                  >
                                    <Edit2 size={12} className="text-blue-600" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="p-1.5 hover:bg-red-100 rounded-lg transition-all"
                                  >
                                    <Trash2 size={12} className="text-red-600" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                {task.description}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${column.color} text-white font-medium`}>
                                  {column.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl shadow-lg p-16 text-center">
              <div className="text-gray-400 mb-4 animate-bounce">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No Project Selected</h3>
              <p className="text-gray-500 text-lg">Select a project from the sidebar or create a new one</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setEditingProject(null);
        }}
        title={editingProject ? '✏️ Edit Project' : '✨ Create New Project'}
      >
        <ProjectForm
          project={editingProject}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={() => {
            setShowProjectModal(false);
            setEditingProject(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        title={editingTask ? '✏️ Edit Task' : '📝 Create New Task'}
      >
        <TaskForm
          task={editingTask}
          projectId={selectedProject?._id}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
        />
      </Modal>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotateZ(0deg); opacity: 1; }
          100% { transform: translateY(1000px) rotateZ(720deg); opacity: 0; }
        }
        
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-confetti { animation: confetti 3s ease-out forwards; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        
        .scale-102 { transform: scale(1.02); }
      `}</style>
    </div>
  );
}