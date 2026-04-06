# TaskFlow Setup Checklist

Complete these steps to get your fancy to-do list app running:

## Phase 1: MySQL Database Setup

- [ ] Install MySQL Community Server
  - Download from: https://dev.mysql.com/downloads/mysql/
  - Installation guide in `MYSQL_SETUP_GUIDE.md`

- [ ] Start MySQL service
  - macOS: `brew services start mysql`
  - Windows: MySQL service should auto-start
  - Linux: `sudo systemctl start mysql`

- [ ] Verify MySQL installation
  ```bash
  mysql --version
  mysql -u root -p
  # Type password and you should see mysql> prompt
  EXIT;
  ```

- [ ] Create database and tables
  - Run MySQL as root: `mysql -u root -p`
  - Create database: `CREATE DATABASE todo_app_db;`
  - Use database: `USE todo_app_db;`
  - Copy entire schema from `server/src/schema.sql`
  - Paste into MySQL prompt and press Enter
  - Verify: `SHOW TABLES;` (should show 4 tables)

## Phase 2: Backend Server Setup

- [ ] Navigate to server directory
  ```bash
  cd server
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```

- [ ] Create/verify `.env` file
  - Filename: `server/.env`
  - Contents:
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=todo_app_db
    PORT=5000
    NODE_ENV=development
    ```
  - Replace `your_mysql_password` with actual MySQL root password

- [ ] Build backend
  ```bash
  npm run build
  ```
  - Should complete without errors
  - Creates `dist/` folder

- [ ] (Optional) Seed sample data
  ```bash
  npm run seed
  ```
  - Populates database with 9 sample todos
  - Creates 9 sample categories and tags

- [ ] Start backend server
  ```bash
  npm run dev
  ```
  - Should display:
    ```
    ✓ Database connected successfully
    ✓ Server running on http://localhost:5000
    ```
  - Leave this terminal running
  - Proceed to Phase 3 in a new terminal

## Phase 3: Frontend Setup

- [ ] Navigate to project root (in new terminal)
  ```bash
  cd /path/to/project  # Go up from server folder
  ```

- [ ] Install frontend dependencies
  ```bash
  npm install
  ```

- [ ] Build frontend
  ```bash
  npm run build
  ```
  - Should show build summary
  - Creates `dist/` folder

- [ ] Start frontend development server
  ```bash
  npm run dev
  ```
  - Should display: `http://localhost:5173/`
  - Click the link or open in browser

## Phase 4: Verify Installation

### Frontend UI Tests
- [ ] Page loads without errors (check browser console)
- [ ] See "TaskFlow" header with gradient background
- [ ] See "New Task" button
- [ ] See search bar and filter section
- [ ] See progress indicator (0/0 or 9/0 if seeded)

### API Tests (if seeded data)
- [ ] Tasks appear in the list
- [ ] Multiple sample tasks visible
- [ ] Tasks show priority badges (Low, Medium, High)
- [ ] Tasks show categories

### Create New Task
- [ ] Click "New Task" button
- [ ] Fill in title: "Test Todo"
- [ ] Fill in description: "This is a test"
- [ ] Select priority: "High"
- [ ] Click "Create" button
- [ ] New task appears in list

### Complete Task
- [ ] Click circle checkbox on any task
- [ ] Task should show checkmark
- [ ] Task title becomes grayed out
- [ ] Progress bar increases

### Edit Task
- [ ] Click on any task card
- [ ] Modal opens with task details
- [ ] Modify title or priority
- [ ] Click "Update" button
- [ ] Changes reflected in list

### Search Tasks
- [ ] Type in search bar: "test" or "dashboard"
- [ ] List filters to matching tasks
- [ ] Clear search (X button) shows all tasks again

### Filter Tasks
- [ ] Change Status filter to "Pending"
- [ ] List shows only pending tasks
- [ ] Change Priority to "High"
- [ ] List shows only high priority tasks
- [ ] Click "Clear Filters" to reset

### Delete Task
- [ ] Hover over any task
- [ ] Trash icon appears on the right
- [ ] Click trash icon
- [ ] Task is removed from list

## Phase 5: Testing API Endpoints

Open a new terminal and test endpoints:

```bash
# Test 1: Get all todos
curl http://localhost:5000/api/todos

# Test 2: Get all categories
curl http://localhost:5000/api/categories

# Test 3: Create new todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API Test Todo",
    "priority": "medium",
    "status": "pending"
  }'

# Test 4: Search todos
curl "http://localhost:5000/api/todos/search?q=test"

# Test 5: Get todo by ID (replace 1 with actual ID)
curl http://localhost:5000/api/todos/1
```

- [ ] All curl commands return JSON responses
- [ ] No "Connection refused" errors
- [ ] HTTP status codes are 200 or 201 for success

## Phase 6: Production Build

When ready to deploy:

```bash
# Build backend
cd server
npm run build
# Output: dist/ folder with compiled JavaScript

# Build frontend
cd ..
npm run build
# Output: dist/ folder with optimized HTML/JS/CSS
```

## Troubleshooting Checklist

If something doesn't work:

- [ ] Check MySQL is running
  ```bash
  mysql -u root -p -e "SHOW DATABASES;"
  ```

- [ ] Check backend is running
  ```bash
  curl http://localhost:5000/api/todos
  ```

- [ ] Check frontend error messages
  - Open browser DevTools (F12)
  - Check Console tab for errors
  - Check Network tab for API calls

- [ ] Restart services
  ```bash
  # Stop backend (Ctrl+C in terminal)
  # Stop frontend (Ctrl+C in terminal)
  # npm run dev  # Restart both
  ```

- [ ] Clear browser cache
  - DevTools → Application → Clear storage
  - Or use Ctrl+Shift+Delete

- [ ] Check port conflicts
  ```bash
  # Check if ports are in use:
  lsof -i :5000    # Backend port
  lsof -i :5173    # Frontend port
  ```

- [ ] Review detailed guides
  - `MYSQL_SETUP_GUIDE.md` - MySQL specifics
  - `QUICK_START.md` - Overview and features

## File Checklist

Verify these files exist:

### Backend (`server/`)
- [ ] `server/package.json`
- [ ] `server/tsconfig.json`
- [ ] `server/.env`
- [ ] `server/src/index.ts`
- [ ] `server/src/config/database.ts`
- [ ] `server/src/models/Todo.ts`
- [ ] `server/src/models/Tag.ts`
- [ ] `server/src/models/Category.ts`
- [ ] `server/src/routes/todos.ts`
- [ ] `server/src/routes/tags.ts`
- [ ] `server/src/routes/categories.ts`
- [ ] `server/src/schema.sql`
- [ ] `server/src/seed.ts`
- [ ] `server/src/middleware/errorHandler.ts`

### Frontend (`src/`)
- [ ] `src/App.tsx`
- [ ] `src/services/api.ts`
- [ ] `src/hooks/useTodos.ts`
- [ ] `src/hooks/useCategories.ts`
- [ ] `src/components/Header.tsx`
- [ ] `src/components/TodoCard.tsx`
- [ ] `src/components/TodoModal.tsx`
- [ ] `src/components/SearchBar.tsx`
- [ ] `src/components/FilterBar.tsx`
- [ ] `src/components/EmptyState.tsx`
- [ ] `src/components/LoadingState.tsx`

### Documentation
- [ ] `MYSQL_SETUP_GUIDE.md`
- [ ] `QUICK_START.md`
- [ ] `SETUP_CHECKLIST.md` (this file)

## Success Criteria

Your app is ready when:

✅ Backend server starts without errors
✅ Frontend loads without console errors
✅ Can create new todos from UI
✅ Can complete/uncomplete todos
✅ Can search and filter todos
✅ Can edit and delete todos
✅ All API endpoints respond with JSON
✅ Progress indicator updates correctly
✅ UI is responsive on mobile and desktop
✅ No CORS or connection errors

## Next Steps After Setup

1. **Explore Features**
   - Test all CRUD operations
   - Try different filters and searches
   - Check mobile responsiveness

2. **Customize (Optional)**
   - Change app name in header
   - Modify color scheme in Tailwind config
   - Add new categories

3. **Add Features (Optional)**
   - User authentication
   - Due date reminders
   - Task recurring
   - Export/Import

4. **Deploy (Optional)**
   - Deploy backend to cloud (Heroku, AWS, DigitalOcean)
   - Deploy frontend to static hosting (Vercel, Netlify)

---

**Total Setup Time**: ~30-45 minutes

**Need Help?**
- Check MYSQL_SETUP_GUIDE.md for MySQL issues
- Check QUICK_START.md for feature overview
- Review browser console for specific errors
- Check terminal output for server logs

Enjoy your TaskFlow app! 🎉
