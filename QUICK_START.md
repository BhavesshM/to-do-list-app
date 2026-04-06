# TaskFlow - Fancy To-Do List App - Quick Start Guide

A beautiful, sassy, elegant task management app built with React, TypeScript, Vite, Express.js, and MySQL.

## Project Structure

```
project/
├── src/                          # React frontend
│   ├── components/               # UI components
│   ├── hooks/                    # React hooks for data management
│   ├── services/                 # API service layer
│   ├── App.tsx                   # Main app component
│   └── index.css                 # Tailwind styles
├── server/                       # Express backend
│   ├── src/
│   │   ├── config/               # Database configuration
│   │   ├── models/               # Database models (Todo, Tag, Category)
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/           # Express middleware
│   │   ├── schema.sql            # Database schema
│   │   ├── seed.ts               # Seed script
│   │   └── index.ts              # Server entry point
│   ├── dist/                     # Compiled JavaScript
│   └── package.json
├── MYSQL_SETUP_GUIDE.md          # Detailed MySQL setup instructions
└── package.json
```

## Features

✨ **Beautiful UI**
- Gradient headers with smooth transitions
- Card-based layouts with shadows and hover effects
- Animated checkboxes and smooth interactions
- Priority badges with color coding
- Due date indicators with urgent styling
- Empty states with encouraging messages

🎯 **Core Features**
- Create, read, update, delete todos
- Mark todos as complete/incomplete
- Filter by status, priority, and category
- Search across title and description
- Organize with categories and tags
- Track completion progress with visual indicators

⚡ **Advanced Features**
- Real-time API integration
- Optimistic UI updates for fast feedback
- Error handling with user-friendly messages
- Loading states with skeleton screens
- Responsive design for mobile and desktop

## System Requirements

- Node.js 14+ and npm
- MySQL 5.7+ or MySQL 8.0+
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

### Step 1: Install MySQL

Follow the detailed MySQL setup in `MYSQL_SETUP_GUIDE.md`

Key steps:
- Install MySQL Community Server
- Create database: `todo_app_db`
- Create tables from schema
- Note your MySQL credentials

### Step 2: Configure Backend

```bash
# Edit server/.env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app_db
PORT=5000
NODE_ENV=development
```

### Step 3: Start Backend Server

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev
```

Expected output:
```
✓ Database connected successfully
✓ Server running on http://localhost:5000
```

### Step 4: Seed Sample Data (Optional)

In a new terminal:
```bash
cd server
npm run seed
```

### Step 5: Start Frontend Development

```bash
# Terminal 2 - Frontend (in project root)
npm run dev
```

The app opens at `http://localhost:5173`

## Testing the Application

### Using the UI

1. Click "New Task" button to create todos
2. Fill in title, description, priority, category, and due date
3. Click checkboxes to complete tasks
4. Click task cards to edit
5. Use search bar to find todos
6. Use filters to organize by status, priority, or category

### Testing with curl

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Todo",
    "priority": "high",
    "status": "pending"
  }'

# Get all categories
curl http://localhost:5000/api/categories

# Get all tags
curl http://localhost:5000/api/tags

# Search todos
curl "http://localhost:5000/api/todos/search?q=dashboard"
```

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos (filters: status, priority, category)
- `POST /api/todos` - Create new todo
- `GET /api/todos/:id` - Get single todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/complete` - Mark todo complete/pending
- `GET /api/todos/search?q=query` - Search todos

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `DELETE /api/categories/:id` - Delete category

### Tags
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag
- `DELETE /api/tags/:id` - Delete tag

## Build for Production

```bash
# Build server
cd server
npm run build

# Build frontend
cd ..
npm run build

# Output files in dist/
```

## Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `src/services/api.ts` - API_URL should be `http://localhost:5000/api`
- Check browser console for CORS errors

### Database connection failed
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `server/.env`
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`
- Verify tables created: `mysql -u root -p todo_app_db -e "SHOW TABLES;"`

### Port already in use
- Backend (5000): `lsof -ti:5000 | xargs kill -9` (macOS/Linux)
- Frontend (5173): `lsof -ti:5173 | xargs kill -9` (macOS/Linux)

### MySQL password issues
- Reset password: See MYSQL_SETUP_GUIDE.md troubleshooting section

## Development Tips

### Adding New Components
1. Create component in `src/components/`
2. Use existing components as templates
3. Follow TypeScript + React patterns

### Adding New API Endpoints
1. Create model in `server/src/models/`
2. Create route in `server/src/routes/`
3. Add to router in `server/src/index.ts`
4. Update `src/services/api.ts` with frontend integration

### Customizing Styles
- Edit `src/index.css` for global styles
- Tailwind CSS classes in components
- Colors defined in `tailwind.config.js`

## Performance Notes

- API calls include error handling and retry logic
- UI updates optimistically for fast feedback
- Database queries use indexes on frequently filtered columns
- Frontend lazy loads components for better initial load time

## Security

- Input validation on all API endpoints
- SQL injection protection via parameterized queries
- CORS configured for local development
- Error messages don't expose sensitive info
- Database credentials in .env (never commit!)

## Next Steps

1. ✅ MySQL setup complete
2. ✅ Backend server running
3. ✅ Frontend connected
4. Test all features in the UI
5. (Optional) Deploy to cloud services
6. (Optional) Add authentication/user accounts
7. (Optional) Add export/import functionality

## Support Resources

- **MySQL**: [MySQL Official Docs](https://dev.mysql.com/doc/)
- **Express.js**: [Express.js Guide](https://expressjs.com/)
- **React**: [React Documentation](https://react.dev)
- **Tailwind CSS**: [Tailwind CSS Docs](https://tailwindcss.com)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Enjoy your beautiful, functional todo app! 🚀
