# Artisan Platform Backend API

Backend API for the Moroccan Artisan Platform built with Express.js and LowDB.

## Features

- 🔐 JWT Authentication
- 👥 User Management (Admin & Artisan roles)
- 📦 Catalog Management (Categories & Materials)
- 📋 Project Management with Bill of Materials
- 🌍 Bilingual Support (Arabic/French)
- 📤 Export to JSON/CSV

## Tech Stack

- **Express.js** - Web framework
- **LowDB** - JSON file database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation

## Installation

```bash
cd backend
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Database Seeding

Seed the database with initial data:

```bash
npm run seed
```

This creates:
- Admin user: `admin@artisan.ma` / `admin123`
- Artisan user: `artisan@artisan.ma` / `artisan123`
- Sample categories and materials

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/me` - Get current user
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/:id/subcategories` - Get subcategories
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Materials
- `GET /api/materials` - Get all materials (supports ?categoryId, ?search, ?lang)
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials` - Create material (Admin only)
- `PUT /api/materials/:id` - Update material (Admin only)
- `DELETE /api/materials/:id` - Delete material (Admin only)

### Projects
- `GET /api/projects` - Get all projects (filtered by user role)
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/:id/details` - Get project with populated materials
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/items` - Add item to project
- `PUT /api/projects/:id/items/:itemId` - Update project item
- `DELETE /api/projects/:id/items/:itemId` - Remove item from project
- `GET /api/projects/:id/export/json` - Export project as JSON
- `GET /api/projects/:id/export/csv` - Export project as CSV

## Data Models

### User
```javascript
{
  id: string,
  email: string,
  password: string (hashed),
  name: string,
  role: 'admin' | 'artisan',
  phone: string?,
  specialty: string?,
  createdAt: ISO date,
  updatedAt: ISO date
}
```

### Category
```javascript
{
  id: string,
  nameAr: string,
  nameFr: string,
  descriptionAr: string?,
  descriptionFr: string?,
  parentId: string?,
  createdAt: ISO date,
  updatedAt: ISO date
}
```

### Material
```javascript
{
  id: string,
  categoryId: string,
  nameAr: string,
  nameFr: string,
  descriptionAr: string?,
  descriptionFr: string?,
  unit: string,
  defaultPrice: number?,
  sku: string?,
  imageUrl: string?,
  createdAt: ISO date,
  updatedAt: ISO date
}
```

### Project
```javascript
{
  id: string,
  userId: string,
  nameAr: string,
  nameFr: string,
  descriptionAr: string?,
  descriptionFr: string?,
  clientName: string?,
  clientPhone: string?,
  clientAddress: string?,
  items: [
    {
      id: string,
      materialId: string,
      quantity: number,
      unit: string,
      customPrice: number?
    }
  ],
  status: 'draft' | 'submitted' | 'completed',
  createdAt: ISO date,
  updatedAt: ISO date
}
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  error: "Error message",
  stack: "..." // Only in development
}
```

## Future Improvements

- Migrate to SQLite/PostgreSQL
- Add file upload for material images
- Implement PDF export
- Add email notifications
- Add audit logs
