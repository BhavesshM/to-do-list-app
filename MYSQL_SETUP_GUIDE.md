# MySQL Setup Guide for Todo App

## Prerequisites

Before starting, ensure you have:
- Node.js (v14+) installed
- npm or yarn package manager
- MySQL Community Server (or compatible database)

## Step 1: Install MySQL

### On macOS (using Homebrew)
```bash
brew install mysql
brew services start mysql
```

### On Windows
1. Download MySQL Community Server from https://dev.mysql.com/downloads/mysql/
2. Run the installer and follow the setup wizard
3. Configure MySQL with port 3306 (default)
4. Set root password during installation
5. Start MySQL service

### On Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation
```

## Step 2: Verify MySQL Installation

Open terminal/command prompt and run:
```bash
mysql --version
```

You should see the MySQL version number.

## Step 3: Connect to MySQL

```bash
mysql -u root -p
```

When prompted, enter the password you set during installation.

If successful, you'll see the MySQL prompt: `mysql>`

## Step 4: Create Database and Tables

Inside MySQL prompt, run:

```sql
CREATE DATABASE todo_app_db;
USE todo_app_db;
```

Now paste the entire schema from `server/src/schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'completed') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  due_date DATETIME,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_due_date (due_date),
  INDEX idx_category (category)
);

CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo_tags (
  todo_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (todo_id, tag_id),
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Verify tables were created:
```sql
SHOW TABLES;
```

Exit MySQL:
```sql
EXIT;
```

## Step 5: Configure Server Environment

Edit `server/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app_db
PORT=5000
NODE_ENV=development
```

Replace `your_password` with the MySQL root password you set during installation.

## Step 6: Install Server Dependencies

```bash
cd server
npm install
```

## Step 7: Seed Database with Sample Data (Optional)

```bash
npm run seed
```

This will populate the database with sample todos, categories, and tags for testing.

## Step 8: Start the Server

```bash
npm run dev
```

You should see:
```
✓ Database connected successfully
✓ Server running on http://localhost:5000
✓ Use /api/todos, /api/tags, /api/categories endpoints
```

## Testing the API

### Using curl

#### Get all todos:
```bash
curl http://localhost:5000/api/todos
```

#### Create a new todo:
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first todo",
    "description": "This is a test todo",
    "priority": "high",
    "status": "pending"
  }'
```

#### Update a todo (replace 1 with actual ID):
```bash
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

#### Delete a todo (replace 1 with actual ID):
```bash
curl -X DELETE http://localhost:5000/api/todos/1
```

#### Search todos:
```bash
curl "http://localhost:5000/api/todos/search?q=dashboard"
```

#### Get all tags:
```bash
curl http://localhost:5000/api/tags
```

#### Get all categories:
```bash
curl http://localhost:5000/api/categories
```

### Using Postman

1. Download and install Postman from https://www.postman.com/downloads/
2. Create a new request
3. Set method to GET and URL to `http://localhost:5000/api/todos`
4. Click Send
5. You should receive a JSON array of todos

### Using VSCode REST Client Extension

1. Install "REST Client" extension in VSCode
2. Create a file `test.http` with your requests:

```http
### Get all todos
GET http://localhost:5000/api/todos

### Create a new todo
POST http://localhost:5000/api/todos
Content-Type: application/json

{
  "title": "Learn TypeScript",
  "description": "Master TypeScript fundamentals",
  "priority": "high",
  "due_date": "2024-12-31",
  "category": "Learning"
}

### Get single todo
GET http://localhost:5000/api/todos/1

### Update todo
PUT http://localhost:5000/api/todos/1
Content-Type: application/json

{
  "status": "completed"
}

### Delete todo
DELETE http://localhost:5000/api/todos/1

### Get all categories
GET http://localhost:5000/api/categories

### Get all tags
GET http://localhost:5000/api/tags
```

Click the "Send Request" link that appears above each request.

## Troubleshooting

### Connection Error: "connect ECONNREFUSED"
- Ensure MySQL is running: `mysql -u root -p` should connect
- Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env file
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port Already in Use
- Change PORT in `.env` (default is 5000)
- Or find and kill process on port 5000:
  - macOS/Linux: `lsof -ti:5000 | xargs kill -9`
  - Windows: `netstat -ano | findstr :5000`

### Password Issues
- Reset MySQL root password: https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html

### Table Creation Failed
- Drop and recreate database:
```sql
DROP DATABASE todo_app_db;
CREATE DATABASE todo_app_db;
USE todo_app_db;
-- Then paste schema again
```

## API Documentation

### Todos Endpoints

- `GET /api/todos` - Get all todos (supports filters: status, priority, category)
- `POST /api/todos` - Create new todo
- `GET /api/todos/:id` - Get single todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/complete` - Mark todo as complete
- `GET /api/todos/search?q=query` - Search todos

### Tags Endpoints

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create new tag
- `DELETE /api/tags/:id` - Delete tag
- `POST /api/todos/:todoId/tags/:tagId` - Add tag to todo
- `DELETE /api/todos/:todoId/tags/:tagId` - Remove tag from todo

### Categories Endpoints

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `DELETE /api/categories/:id` - Delete category

## Next Steps

1. Test all API endpoints using curl or Postman
2. Build the React frontend to consume these APIs
3. Configure CORS settings if needed
4. Add authentication/authorization as needed

---

For more help, check the API response messages or review server logs.
