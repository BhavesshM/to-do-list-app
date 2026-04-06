# TaskFlow - Commands Reference

Quick reference for all commands needed to set up and run the application.

## MySQL Database Setup

### Install MySQL
```bash
# macOS (Homebrew)
brew install mysql

# Windows
# Download from https://dev.mysql.com/downloads/mysql/

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install mysql-server
```

### Start MySQL Service
```bash
# macOS
brew services start mysql

# Linux
sudo systemctl start mysql

# Windows
# Should start automatically
```

### Verify MySQL Installation
```bash
mysql --version
mysql -u root -p  # Enter password when prompted
EXIT;
```

### Create Database and Tables
```bash
mysql -u root -p
CREATE DATABASE todo_app_db;
USE todo_app_db;
# Copy entire content of server/src/schema.sql and paste
SHOW TABLES;
EXIT;
```

## Backend Server Setup

### Navigate to Server Directory
```bash
cd server
```

### Install Dependencies
```bash
npm install
```

### Create .env File
```bash
# Create file manually or use:
cat > .env << EOF
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app_db
PORT=5000
NODE_ENV=development
EOF
```

### Build Backend
```bash
npm run build
```

### Seed Database with Sample Data
```bash
npm run seed
```

### Start Backend Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Backend
```bash
npm start
```

## Frontend Setup

### Go to Project Root
```bash
cd ..  # If in server directory
```

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build Frontend
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run typecheck
```

## Testing Commands

### Test Backend API Endpoints

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Get pending todos
curl "http://localhost:5000/api/todos?status=pending"

# Get high priority todos
curl "http://localhost:5000/api/todos?priority=high"

# Create a new todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Todo",
    "description": "Test description",
    "priority": "high",
    "status": "pending"
  }'

# Get single todo (replace 1 with actual ID)
curl http://localhost:5000/api/todos/1

# Update todo
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Complete todo
curl -X PATCH http://localhost:5000/api/todos/1/complete \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Delete todo
curl -X DELETE http://localhost:5000/api/todos/1

# Search todos
curl "http://localhost:5000/api/todos/search?q=test"

# Get all categories
curl http://localhost:5000/api/categories

# Create category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Work", "color": "#3B82F6"}'

# Get all tags
curl http://localhost:5000/api/tags

# Create tag
curl -X POST http://localhost:5000/api/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "urgent"}'

# Health check
curl http://localhost:5000/health
```

### Test with Postman

1. Open Postman
2. Create new request
3. Set Method and URL:
   - GET http://localhost:5000/api/todos
4. Click Send
5. Should return JSON array

## Database Commands

### Access MySQL
```bash
mysql -u root -p todo_app_db
```

### Show Tables
```sql
SHOW TABLES;
```

### Show Todo Columns
```sql
DESCRIBE todos;
```

### Show All Todos
```sql
SELECT * FROM todos;
```

### Count Todos
```sql
SELECT COUNT(*) FROM todos;
```

### Clear All Data
```sql
TRUNCATE TABLE todo_tags;
TRUNCATE TABLE todos;
TRUNCATE TABLE categories;
TRUNCATE TABLE tags;
```

### Delete Database
```sql
DROP DATABASE todo_app_db;
```

### Exit MySQL
```sql
EXIT;
```

## Development Workflow

### Terminal 1 - Start Backend
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

### Terminal 2 - Start Frontend
```bash
npm run dev
# Runs on http://localhost:5173
```

### Open in Browser
```bash
# Automatically opens, or manually go to:
http://localhost:5173
```

## Production Deployment

### Build Everything
```bash
# Build frontend
npm run build

# Build backend
cd server
npm run build
```

### Deploy Backend

#### Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set DB_HOST=your.mysql.host
heroku config:set DB_USER=your_user
heroku config:set DB_PASSWORD=your_password
heroku config:set DB_NAME=your_db

# Deploy
git push heroku main
```

#### AWS/DigitalOcean/Others
```bash
# Build Docker image, upload, deploy
# See deployment provider documentation
```

### Deploy Frontend

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set API URL environment variable
vercel env add VITE_API_URL
```

#### Netlify
```bash
# Deploy built frontend
# Upload dist/ folder to Netlify

# Or use CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## Cleanup Commands

### Remove Node Modules
```bash
rm -rf node_modules
rm -rf server/node_modules
```

### Remove Built Files
```bash
rm -rf dist
rm -rf server/dist
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Full Clean Rebuild
```bash
# Frontend
rm -rf dist node_modules
npm install
npm run build

# Backend
cd server
rm -rf dist node_modules
npm install
npm run build
```

## Troubleshooting Commands

### Check Port Usage
```bash
# macOS/Linux
lsof -i :5000  # Backend port
lsof -i :5173  # Frontend port

# Windows
netstat -ano | findstr :5000
```

### Kill Process on Port
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Check MySQL Status
```bash
# macOS
brew services list

# Linux
sudo systemctl status mysql

# Windows
# Check Services app
```

### Test Network Connectivity
```bash
# Ping backend
curl -I http://localhost:5000/health

# DNS resolution
nslookup localhost
```

### Check Environment Variables
```bash
# Backend (in server/.env)
cat .env

# Frontend (in .env or vite.config.ts)
echo $VITE_API_URL
```

### View Server Logs
```bash
# Backend logs are printed to console
# Frontend logs in browser DevTools

# Check npm log
npm logs
```

## Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: TaskFlow app"
```

### Push to GitHub
```bash
git remote add origin https://github.com/username/taskflow.git
git branch -M main
git push -u origin main
```

### Ignore Files
```bash
# Create .gitignore
cat > .gitignore << EOF
node_modules/
.env
.env.local
dist/
server/dist/
.DS_Store
EOF
```

## Documentation Commands

### View Documentation
```bash
# In project root, open files with editor or browser
cat README.md
cat QUICK_START.md
cat MYSQL_SETUP_GUIDE.md
cat SETUP_CHECKLIST.md
cat IMPLEMENTATION_SUMMARY.md
```

## System Info Commands

### Check Node Version
```bash
node --version
npm --version
```

### Check MySQL Version
```bash
mysql --version
```

### Check OS
```bash
# macOS/Linux
uname -a

# Windows
systeminfo
```

## One-Line Setup Script

### Full Setup (macOS)
```bash
# Run all commands at once
mysql -u root -p -e "CREATE DATABASE todo_app_db;" && \
cd server && \
npm install && \
npm run build && \
npm run seed && \
cd .. && \
npm install && \
npm run build && \
echo "✅ Setup complete!"
```

### Full Development Start
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2 (new terminal)
npm run dev
```

## Emergency Fixes

### Reset Everything
```bash
# Remove all generated files
rm -rf dist server/dist
rm -rf node_modules server/node_modules
rm -rf server/.env

# Reinstall
npm install
cd server && npm install

# Rebuild
npm run build
cd server && npm run build

# Start fresh
# Recreate MySQL database and tables
```

### Force Stop Everything
```bash
# Kill all Node processes
pkill -f node

# Kill MySQL
# macOS: brew services stop mysql
# Linux: sudo systemctl stop mysql
```

## Performance Checks

### Check Bundle Size
```bash
cd server
npm run build
du -sh dist/

cd ..
npm run build
du -sh dist/
```

### Monitor Backend
```bash
# Use Activity Monitor (macOS) or Task Manager (Windows)
# Or Linux command:
top
```

### Check Database Performance
```sql
-- Show slow queries
SET SESSION query_time=0;
SELECT * FROM information_schema.PROFILING WHERE QUERY_ID=1;
```

---

## Quick Command Summary

**Start Development:**
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
npm run dev
```

**Build for Production:**
```bash
npm run build
cd server && npm run build
```

**Test API:**
```bash
curl http://localhost:5000/api/todos
```

**Reset Database:**
```bash
cd server && npm run seed
```

**Check Status:**
```bash
curl http://localhost:5000/health
```

---

For more information, see the documentation files in the project root.
