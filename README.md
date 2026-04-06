# TaskFlow - Elegant To-Do List Application

A beautifully designed, fully-functional to-do list application with a modern React frontend and robust Express.js + MySQL backend. Built with TypeScript for type safety and Tailwind CSS for stunning UI.

![TaskFlow Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Express](https://img.shields.io/badge/Express-5.2-green)
![MySQL](https://img.shields.io/badge/MySQL-5.7%2B-orange)

## 🌟 Features

### Core Features
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Organize tasks by categories
- ✅ Tag-based organization system
- ✅ Filter by status, priority, and category
- ✅ Full-text search across tasks
- ✅ Due date tracking with overdue indicators

### Design & UX
- 🎨 Beautiful gradient header with smooth transitions
- 🎯 Card-based layout with elegant shadows
- ⚡ Smooth animations and micro-interactions
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎪 Empty states with encouraging messages
- ⏳ Loading states with skeleton screens
- 🎨 Priority-based color coding
- 📊 Visual completion progress tracker

### Technical Features
- 🔐 Input validation and error handling
- 🚀 Optimistic UI updates for fast feedback
- 🔄 Real-time API integration
- 🎯 Efficient database queries with indexes
- 📦 Modular, scalable code architecture
- 🧪 Comprehensive API documentation
- 🛡️ CORS-enabled for frontend-backend communication

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Modern bundler
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Node.js + Express** - Web server framework
- **TypeScript** - Type-safe backend code
- **MySQL 2** - Database driver
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Database
- **MySQL 5.7+** - Relational database
- **Connection pooling** - Performance optimization
- **Indexed queries** - Fast data retrieval

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ with npm
- MySQL 5.7+ or MySQL 8.0+
- Git (for cloning)

### 1. Setup MySQL Database

```bash
# Install MySQL Community Server
# Create database and tables
mysql -u root -p
CREATE DATABASE todo_app_db;
USE todo_app_db;
# Copy schema from server/src/schema.sql and paste
```

See `MYSQL_SETUP_GUIDE.md` for detailed instructions.

### 2. Configure Backend

```bash
cd server
# Edit .env with your MySQL credentials
cat > .env << EOF
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app_db
PORT=5000
NODE_ENV=development
EOF
```

### 3. Start Backend Server

```bash
cd server
npm install
npm run dev
# Output: ✓ Server running on http://localhost:5000
```

### 4. Start Frontend (New Terminal)

```bash
npm run dev
# Output: http://localhost:5173/
```

Open browser and start managing tasks!

## 📂 Project Structure

```
project/
├── src/
│   ├── components/               # Reusable React components
│   │   ├── Header.tsx           # Page header with progress
│   │   ├── TodoCard.tsx         # Individual task card
│   │   ├── TodoModal.tsx        # Create/edit task modal
│   │   ├── SearchBar.tsx        # Search functionality
│   │   ├── FilterBar.tsx        # Filter options
│   │   ├── EmptyState.tsx       # Empty list message
│   │   └── LoadingState.tsx     # Loading skeleton
│   ├── hooks/
│   │   ├── useTodos.ts          # Tasks data management
│   │   └── useCategories.ts     # Categories data management
│   ├── services/
│   │   └── api.ts               # Backend API client
│   ├── App.tsx                  # Main application component
│   └── index.css                # Global Tailwind styles
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts      # MySQL connection
│   │   ├── models/
│   │   │   ├── Todo.ts          # Todo database model
│   │   │   ├── Tag.ts           # Tag database model
│   │   │   └── Category.ts      # Category database model
│   │   ├── routes/
│   │   │   ├── todos.ts         # Todo API endpoints
│   │   │   ├── tags.ts          # Tag API endpoints
│   │   │   └── categories.ts    # Category API endpoints
│   │   ├── middleware/
│   │   │   └── errorHandler.ts  # Global error handling
│   │   ├── index.ts             # Express server setup
│   │   ├── schema.sql           # Database schema
│   │   └── seed.ts              # Sample data seeder
│   ├── dist/                    # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
├── QUICK_START.md               # Quick reference guide
├── MYSQL_SETUP_GUIDE.md         # Detailed MySQL setup
├── SETUP_CHECKLIST.md           # Step-by-step checklist
└── README.md                    # This file
```

## 🔗 API Endpoints

### Todos
```
GET    /api/todos                    # Get all todos
GET    /api/todos?status=pending     # Filter by status
GET    /api/todos?priority=high      # Filter by priority
GET    /api/todos?category=Work      # Filter by category
POST   /api/todos                    # Create new todo
GET    /api/todos/:id                # Get single todo
PUT    /api/todos/:id                # Update todo
DELETE /api/todos/:id                # Delete todo
PATCH  /api/todos/:id/complete       # Mark complete/pending
GET    /api/todos/search?q=query     # Search todos
```

### Categories
```
GET    /api/categories               # Get all categories
POST   /api/categories               # Create new category
DELETE /api/categories/:id           # Delete category
```

### Tags
```
GET    /api/tags                     # Get all tags
POST   /api/tags                     # Create new tag
DELETE /api/tags/:id                 # Delete tag
```

## 🧪 Testing

### Using the UI
1. Create new task: Click "New Task" button
2. Complete task: Click checkbox
3. Search: Type in search bar
4. Filter: Use dropdown selectors
5. Edit: Click on task card
6. Delete: Hover and click trash icon

### Using API with curl
```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","priority":"high"}'

# Search todos
curl "http://localhost:5000/api/todos/search?q=dashboard"

# Complete a todo (ID=1)
curl -X PATCH http://localhost:5000/api/todos/1/complete \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

### Using Postman
1. Import API collection (or create manually)
2. Set base URL: `http://localhost:5000/api`
3. Test each endpoint with different data
4. Verify response codes and formats

## 🏗️ Building for Production

```bash
# Build backend
cd server
npm run build
# Output: dist/ folder

# Build frontend
cd ..
npm run build
# Output: dist/ folder

# Start production backend
cd server
npm start

# Serve frontend from dist/
# Use static hosting service (Netlify, Vercel, etc)
```

## 📱 Responsive Design

- **Mobile** (< 640px): Single column layout, optimized touch targets
- **Tablet** (640px - 1024px): Two-column sections
- **Desktop** (> 1024px): Full multi-column layout

## 🔒 Security Features

- ✅ Input validation on all endpoints
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS configured for development
- ✅ Helmet.js security headers
- ✅ Error messages don't expose system details
- ✅ Environment variables for sensitive config

## 🐛 Troubleshooting

### Can't connect to MySQL
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `server/.env`
- Ensure database exists and tables created
- See `MYSQL_SETUP_GUIDE.md` for details

### Frontend can't reach backend
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Verify API URL in `src/services/api.ts`
- Check network tab in DevTools

### Port already in use
- Find process: `lsof -i :5000` (macOS/Linux)
- Kill process: `lsof -ti:5000 | xargs kill -9`
- Or change PORT in `server/.env`

### Database connection timeout
- Check MySQL service status
- Verify database credentials
- Increase connection timeout in `server/src/config/database.ts`

## 📚 Documentation

- **QUICK_START.md** - Feature overview and getting started
- **MYSQL_SETUP_GUIDE.md** - Detailed MySQL installation
- **SETUP_CHECKLIST.md** - Step-by-step setup verification

## 🎨 Customization

### Change App Name
Edit `src/components/Header.tsx` - change "TaskFlow" text

### Change Colors
Edit `tailwind.config.js` - modify color palette

### Change Port
Edit `server/.env` - change PORT value

### Add New Features
1. Create model in `server/src/models/`
2. Create routes in `server/src/routes/`
3. Add API calls in `src/services/api.ts`
4. Create UI components in `src/components/`

## 📊 Database Schema

### todos table
- `id` (INT, PK, Auto-increment)
- `title` (VARCHAR 255, Required)
- `description` (TEXT, Optional)
- `status` (ENUM: 'pending', 'completed')
- `priority` (ENUM: 'low', 'medium', 'high')
- `due_date` (DATETIME, Optional)
- `category` (VARCHAR 100, Optional)
- `created_at` (TIMESTAMP, Default: now)
- `updated_at` (TIMESTAMP, Default: now, Auto-update)

### categories table
- `id` (INT, PK, Auto-increment)
- `name` (VARCHAR 100, Unique)
- `color` (VARCHAR 7, Default: '#3B82F6')
- `created_at` (TIMESTAMP, Default: now)

### tags table
- `id` (INT, PK, Auto-increment)
- `name` (VARCHAR 100, Unique)
- `created_at` (TIMESTAMP, Default: now)

### todo_tags table (Junction)
- `todo_id` (INT, FK → todos.id)
- `tag_id` (INT, FK → tags.id)
- PK: (todo_id, tag_id)

## 🚀 Deployment

### Backend (Heroku, AWS, DigitalOcean, etc)
1. Compile TypeScript: `npm run build`
2. Set environment variables
3. Deploy `server/dist/` and `node_modules`
4. Point to cloud MySQL database

### Frontend (Netlify, Vercel, etc)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set API URL environment variable
4. Configure redirects for client-side routing

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

To improve TaskFlow:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review browser console for errors
3. Check server terminal logs
4. Verify MySQL connection

## 🎉 Ready to Use!

Your TaskFlow app is production-ready. Start creating and organizing your tasks today!

---

**Made with ❤️ using React, TypeScript, Express, and MySQL**

For more details, see:
- ✅ QUICK_START.md - Feature tour
- ✅ MYSQL_SETUP_GUIDE.md - Database setup
- ✅ SETUP_CHECKLIST.md - Installation verification
