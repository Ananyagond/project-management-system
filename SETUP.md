# 🚀 Quick Setup Guide

Follow these steps to get your Project Management System running in **10 minutes**!

## ✅ Step 1: Prerequisites Check

Make sure you have these installed:

```bash
# Check Node.js version (should be 16+)
node -v

# Check npm version
npm -v

# Check if MongoDB is installed
mongod --version
```

Don't have them? Install here:
- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/try/download/community

---

## 📥 Step 2: Clone & Navigate

```bash
git clone https://github.com/Ananyagond/project-management-system
cd project-management-system
```

---

## 🔧 Step 3: Backend Setup (5 minutes)

### 3.1 Install Backend Dependencies

```bash
cd backend
npm install
```

### 3.2 Create .env File

```bash
# Create the file
touch .env

# Or on Windows:
# type nul > .env
```

### 3.3 Add Environment Variables

Open `backend/.env` in your editor and paste:

```env
MONGODB_URI=mongodb://localhost:27017/project-management
PORT=5000
GEMINI_API_KEY=your_api_key_here
```

### 3.4 Get Your Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)
4. Replace `your_api_key_here` in `.env`

### 3.5 Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
MongoDB runs automatically as a service

**Or use MongoDB Atlas (Cloud):**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### 3.6 Test Backend

```bash
# Test Gemini API
node test-gemini.js

# Should see: ✅ SUCCESS! Gemini 2.5 Flash is working!

# Start backend server
npm run dev

# Should see: 
# Server running on port 5000 🚀
# MongoDB Connected
```

✅ **Backend is ready!** Keep this terminal open.

---

## 🎨 Step 4: Frontend Setup (3 minutes)

Open a **NEW terminal** window:

### 4.1 Navigate to Frontend

```bash
cd frontend
```

### 4.2 Install Frontend Dependencies

```bash
npm install
```

### 4.3 Start Frontend Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

✅ **Frontend is ready!**

---

## 🎉 Step 5: Test the Application

1. Open browser: http://localhost:5173
2. Click "New Project"
3. Create a project: "My First Project"
4. Add a task: "Setup complete!"
5. Drag it to "Done" column
6. Watch the confetti! 🎊

---

## 🐛 Common Issues & Fixes

### Issue: "MongoDB connection error"

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not, start it:
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

### Issue: "Port 5000 already in use"

**Solution:** Change port in `backend/.env`
```env
PORT=5001
```

### Issue: "Gemini API error"

**Solution:** 
1. Check API key in `.env` (no spaces!)
2. Test with: `node test-gemini.js`
3. If still failing, create new API key

### Issue: "Cannot connect to backend"

**Solution:**
1. Make sure backend is running (check terminal)
2. Backend should be on port 5000
3. Check `API_URL` in `frontend/src/App.jsx`

---

## 📱 Next Steps

Now that everything is working:

1. ✅ Create multiple projects
2. ✅ Add tasks and drag them around
3. ✅ Try the AI features (Summarize & Ask Questions)
4. ✅ Explore all animations and effects
5. ✅ Customize the code to your needs!

---

## 🎓 Learning Resources

- **React:** https://react.dev/learn
- **Express.js:** https://expressjs.com/en/starter/basic-routing.html
- **MongoDB:** https://docs.mongodb.com/manual/tutorial/getting-started/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Gemini AI:** https://ai.google.dev/tutorials/get_started_web

---


## 🎊 Congratulations!

You've successfully set up the Project Management System! 

**Happy coding! 🚀**

---

### Quick Command Reference

```bash
# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm run dev

# Test Gemini API
cd backend && node test-gemini.js

# Install dependencies
npm install

# Check MongoDB
mongosh
```