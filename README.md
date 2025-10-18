# 🚀 Project Management System

A modern, AI-powered project and task management system built with the MERN stack. Features an intuitive Kanban board with drag-and-drop functionality, AI-powered task insights, and a beautiful, animated user interface.

![Project Management System](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)

## ✨ Features

### 🎯 Core Features
- **Project Management** - Create, edit, and delete projects with descriptions
- **Kanban Board** - Visual task management with drag-and-drop functionality
- **Task Organization** - Organize tasks into To Do, In Progress, and Done columns
- **Real-time Updates** - Instant UI updates when tasks are moved or modified
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### 🤖 AI-Powered Features
- **Task Summarization** - AI generates insights and summaries of your project tasks
- **Smart Q&A** - Ask questions about specific tasks and get AI-powered answers
- **Recommendations** - Get AI suggestions for task prioritization and workflow


## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling

### AI Integration
- **Google Gemini AI** - Advanced AI model for task analysis and Q&A

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use MongoDB Atlas (cloud database) - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Google Gemini API Key** - [Get API Key](https://aistudio.google.com/app/apikey)

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/project-management-system.git
cd project-management-system
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure Backend Environment Variables:**

Open `backend/.env` and add:

```env
# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/project-management

# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-management

# Server Configuration
PORT=5000

# Google Gemini AI API Key
# Get your key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
```

**Start the Backend Server:**

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

You should see:
```
Server running on port 5000 🚀
MongoDB Connected
```

### 3️⃣ Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### 4️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
project-management-system/
├── backend/
│   ├── controllers/
│   │   ├── projectController.js    # Project CRUD operations
│   │   ├── taskController.js       # Task CRUD operations
│   │   └── aiController.js         # Gemini AI integration
│   ├── models/
│   │   ├── Project.js              # Project schema
│   │   └── Task.js                 # Task schema
│   ├── routes/
│   │   ├── projects.js             # Project routes
│   │   ├── tasks.js                # Task routes
│   │   └── ai.js                   # AI routes
│   ├── .env                        # Environment variables (create this)
│   ├── server.js                   # Express server setup
│   └── package.json                # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main application component
│   │   ├── main.jsx                # Application entry point
│   │   └── index.css               # Global styles (Tailwind)
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── postcss.config.js           # PostCSS configuration
│   └── package.json                # Frontend dependencies
│
└── README.md                       # This file
```

## 🔑 Getting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Choose **"Create API key in new project"**
5. Copy the generated API key (starts with `AIza...`)
6. Paste it into your `backend/.env` file


## 📚 API Documentation

### Projects API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Tasks API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/project/:projectId` | Get all tasks for a project |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/status` | Update task status only |
| DELETE | `/api/tasks/:id` | Delete task |

### AI API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ai/summarize/:projectId` | Get AI summary of project tasks |
| POST | `/api/ai/ask` | Ask AI a question about a task |

### Example API Requests

**Create Project:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Redesign",
    "description": "Redesign company website with modern UI"
  }'
```

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Homepage",
    "description": "Create modern homepage design",
    "status": "To Do",
    "projectId": "your-project-id-here"
  }'
```

**Get AI Summary:**
```bash
curl http://localhost:5000/api/ai/summarize/your-project-id-here
```

## 🎮 Usage Guide

### Creating Your First Project

1. Click the **"New Project"** button (top right)
2. Enter project name and description
3. Click **"Create"**
4. Your project appears in the sidebar

### Adding Tasks

1. Select a project from the sidebar
2. Click **"Add Card"** button
3. Enter task title, description, and status
4. Click **"Create"**

### Organizing Tasks (Drag & Drop)

1. Click and hold on any task card
2. Drag it to another column (To Do → In Progress → Done)
3. Release to drop
4. Watch the confetti when you complete a task! 🎉

### Using AI Features

**Summarize Tasks:**
1. Select a project with tasks
2. Click **"✨ Summarize Tasks"** button
3. AI analyzes and provides insights

**Ask Questions:**
1. Click **"💬 Ask Question"** button
2. Select a task from dropdown
3. Type your question (e.g., "What tools do I need?")
4. Click **"Ask AI"**
5. Get instant AI-powered answer

### Editing and Deleting

- **Edit:** Hover over card → Click pencil icon
- **Delete:** Hover over card → Click trash icon
- Confirm deletion when prompted

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `MongoDB connection error`
```bash
# Solution 1: Check if MongoDB is running
mongosh

# Solution 2: Verify connection string in .env
# Make sure there are no spaces around the = sign
```

**Problem:** `Port 5000 already in use`
```bash
# Solution: Change port in backend/.env
PORT=5001
```

**Problem:** `Gemini API Error: 404 Not Found`
```bash
# Solution: Update aiController.js to use correct model
# Change to: gemini-2.5-flash

# Test your API key:
cd backend
node test-gemini.js
```

### Frontend Issues

**Problem:** `Cannot connect to backend`
```bash
# Solution: Ensure backend is running on port 5000
# Check backend console for errors
# Verify API_URL in frontend/src/App.jsx
```

**Problem:** `Tailwind styles not loading`
```bash
# Solution: Clear cache and rebuild
cd frontend
rm -rf node_modules/.vite
npm run dev
```

**Problem:** `Module not found: lucide-react`
```bash
# Solution: Install missing package
npm install lucide-react
```

### Database Issues

**Problem:** `Authentication failed` (MongoDB Atlas)
```bash
# Solution:
# 1. Check username and password in connection string
# 2. Verify Network Access allows your IP (0.0.0.0/0 for all)
# 3. Check Database Access user permissions
```

## 🧪 Testing

### Test Backend API

```bash
# Test server is running
curl http://localhost:5000/api/projects

# Expected response:
# {"success":true,"data":[]}
```

### Test Gemini AI

```bash
cd backend
node test-gemini.js

# Expected output:
# ✅ SUCCESS! Gemini 2.5 Flash is working!
```

## 📊 Performance Optimization

- **Frontend:** Code splitting, lazy loading, image optimization
- **Backend:** Database indexing, caching, query optimization
- **Database:** Proper indexes on frequently queried fields

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- GitHub: [@Ananyagond](https://github.com/Ananyagond)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - UI Library
- [Express.js](https://expressjs.com/) - Backend Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Google Gemini AI](https://ai.google.dev/) - AI Integration
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icon Library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/yourusername/project-management-system/issues)
3. Create a new issue with detailed information
4. Join our [Discord Community](https://discord.gg/yourserver) (optional)

## 🗺️ Roadmap

### Version 2.0 (Planned)

- [ ] User authentication and authorization
- [ ] Team collaboration features
- [ ] Real-time updates with WebSockets
- [ ] File attachments for tasks
- [ ] Task comments and discussions
- [ ] Due dates and reminders
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Advanced analytics dashboard
- [ ] Export projects to PDF/Excel
- [ ] Mobile native apps (iOS/Android)
- [ ] Integration with Slack, Discord
- [ ] Custom task labels and tags
- [ ] Time tracking for tasks
- [ ] Calendar view
