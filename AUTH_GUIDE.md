# Authentication Guide

This project now includes a complete authentication system using SQLite3 and Drizzle ORM.

## Features

- User registration with email and username
- User login (supports both email and username)
- User logout
- Session management using iron-session
- Password hashing with bcryptjs
- Protected routes and API endpoints

## Database Setup

The SQLite database is automatically created when you push the schema:

```bash
npm run db:push
```

### Database Scripts

- `npm run db:generate` - Generate migrations from schema
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema directly to database (quick setup)
- `npm run db:studio` - Open Drizzle Studio to view/manage data

## Environment Variables

Create a `.env.local` file in the root directory:

```env
SESSION_SECRET=your_super_secret_key_at_least_32_characters_long_change_this
```

**IMPORTANT:** Use a strong, random secret in production. Generate one using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## API Endpoints

### Register

**POST** `/api/auth/register`

Request body:
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username"
  }
}
```

### Login

**POST** `/api/auth/login`

Request body:
```json
{
  "emailOrUsername": "user@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username"
  }
}
```

### Logout

**POST** `/api/auth/logout`

Response (200):
```json
{
  "message": "Logout successful"
}
```

### Get Session

**GET** `/api/auth/session`

Response (200):
```json
{
  "isLoggedIn": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username"
  }
}
```

## Usage in Your Code

### Server Components / API Routes

```typescript
import { getCurrentUser, isAuthenticated, requireAuth } from '@/lib/auth';

// Get current user
const user = await getCurrentUser();

// Check if authenticated
const authenticated = await isAuthenticated();

// Require authentication (throws error if not authenticated)
await requireAuth();
```

### Client Components

Create a hook to manage authentication state:

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    }
    return data;
  };

  const register = async (email: string, username: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return { user, loading, login, register, logout };
}
```

## Database Schema

### Users Table

- `id` - Auto-incrementing integer (primary key)
- `email` - Unique email address
- `username` - Unique username
- `password` - Hashed password
- `createdAt` - Timestamp of account creation
- `updatedAt` - Timestamp of last update

## Security Features

- Passwords are hashed using bcryptjs with 10 salt rounds
- Sessions are encrypted using iron-session
- HTTP-only cookies prevent XSS attacks
- Email validation on registration
- Password minimum length requirement (8 characters)
- Unique email and username constraints

## File Structure

```
/
├── app/
│   └── api/
│       └── auth/
│           ├── register/route.ts    # Registration endpoint
│           ├── login/route.ts       # Login endpoint
│           ├── logout/route.ts      # Logout endpoint
│           └── session/route.ts     # Get session endpoint
├── db/
│   ├── index.ts                     # Database connection
│   ├── schema.ts                    # User schema definition
│   └── local.db                     # SQLite database file (auto-created)
├── lib/
│   ├── auth.ts                      # Auth helper functions
│   └── session.ts                   # Session configuration
├── drizzle.config.ts                # Drizzle ORM configuration
└── .env.local                       # Environment variables (create this)
```

## Next Steps

1. Create login/register UI components
2. Add protected routes/pages
3. Implement user profile management
4. Add password reset functionality
5. Consider adding OAuth providers
6. Implement role-based access control (RBAC) if needed

## Testing

You can test the API endpoints using curl:

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrUsername":"testuser","password":"password123"}' \
  -c cookies.txt

# Get Session
curl http://localhost:3000/api/auth/session -b cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```
