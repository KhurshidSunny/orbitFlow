# OrbitFlow PM - Multi-Role Project Management Dashboard

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1.5-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

A production-ready, full-stack project management dashboard with role-based access control, Kanban boards, and real-time analytics.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [User Roles](#-user-roles)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

OrbitFlow PM is a comprehensive project management dashboard designed for teams to collaborate efficiently. It provides a unified platform with role-based access control, enabling admins, managers, and members to manage projects, tasks, and workflows seamlessly.

### Key Highlights

- ✅ **Multi-Role System**: Admin, Manager, and Member roles with granular permissions
- ✅ **Kanban Board**: Drag-and-drop task organization with customizable columns
- ✅ **Real-Time Analytics**: Interactive charts and performance metrics
- ✅ **Secure Authentication**: JWT-based auth with HTTP-only cookies
- ✅ **Activity Logging**: Comprehensive tracking of all project changes
- ✅ **Responsive Design**: Mobile-first UI with light/dark theme support
- ✅ **Production-Ready**: Fully deployed on Vercel with MongoDB Atlas

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- HTTP-only cookie session management
- Role-based access control (RBAC)
- Protected API routes with middleware
- Automatic token refresh

### 📊 Project Management
- Create, view, edit, and archive projects
- Project ownership and member assignment
- Status tracking (Planning, In Progress, Review, Done)
- Priority levels (Low, Medium, High)
- Due date management

### 📋 Kanban Board
- Drag-and-drop task organization
- Customizable columns (Backlog, In Progress, Review, Done)
- Task assignment and tracking
- Real-time task status updates
- Column ordering

### ✅ Task Management
- Create, update, and delete tasks
- Task assignment to team members
- Priority and tag management
- Task descriptions and metadata
- Task filtering and search

### 📝 Activity Logging
- Comprehensive activity tracking
- Real-time updates on project changes
- Task creation, updates, and movements
- Member additions and removals
- Project status changes

### 👥 User Management
- Admin: Create users (Manager/Member roles)
- Manager: Create users (Member role only)
- User profile management
- Role assignment and permissions

### 📈 Analytics & Dashboards
- Interactive charts and graphs (Recharts)
- Project velocity tracking
- Task completion metrics
- Team performance analytics
- Workload distribution visualization

### 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Light/dark theme toggle
- Modern gradient card designs
- Smooth animations
- Loading states
- Error handling
- Toast notifications
- Modal dialogs

---

## 🛠 Tech Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts 3.7.0** - Data visualization
- **Lucide React** - Icon library
- **Class Variance Authority** - Component styling

### Backend
- **Node.js** - Runtime environment
- **Next.js API Routes** - RESTful API endpoints
- **MongoDB 9.1.5** - NoSQL database
- **Mongoose** - MongoDB ODM

### Authentication & Security
- **JWT (Jose)** - JSON Web Tokens
- **Bcrypt.js** - Password hashing
- **HTTP-Only Cookies** - Secure session storage

### Deployment
- **Vercel** - Hosting platform
- **MongoDB Atlas** - Cloud database

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git** for version control

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/orbitflow-pm-dashboard.git
cd orbitflow-pm-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=orbitflow
AUTH_SECRET=your_long_random_secret_key_here
```

**Important**: 
- Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string
- Replace `your_long_random_secret_key_here` with a secure random string (at least 32 characters)
- Never commit `.env.local` to version control

### 4. Generate AUTH_SECRET

You can generate a secure secret key using:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use an online generator
# https://generate-secret.vercel.app/32
```

---

## 🗄 Database Setup

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Create a new cluster (free tier is sufficient)
   - Wait for the cluster to be created

3. **Configure Network Access**
   - Go to **Network Access**
   - Add your IP address (or `0.0.0.0/0` for development)
   - Click **Add IP Address**

4. **Create Database User**
   - Go to **Database Access**
   - Click **Add New Database User**
   - Choose **Password** authentication
   - Create a username and password
   - Set user privileges to **Read and write to any database**
   - Click **Add User**

5. **Get Connection String**
   - Go to **Database** → **Connect**
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `orbitflow`)

### Seed the Database

After setting up your environment variables, seed the database with sample data:

```bash
# Start the development server
npm run dev

# In another terminal or browser, visit:
# http://localhost:3000/api/seed
```

Or use curl:

```bash
curl -X GET http://localhost:3000/api/seed
```

This will create:
- 3 sample users (Admin, Manager, Member)
- 3 sample projects
- Columns for each project
- Sample tasks
- Activity logs

**Default Login Credentials:**
- **Admin**: `jalil@orbitflow.io` / `Orbitflow@123`
- **Manager**: `alicia@orbitflow.io` / `Orbitflow@123`
- **Member**: `john@orbitflow.io` / `Orbitflow@123`

---

## 💻 Usage

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
orbitflow-pm-dashboard/
├── public/                 # Static assets
│   ├── favicon.svg        # Favicon
│   ├── logo-light.svg     # Light theme logo
│   └── logo-dark.svg      # Dark theme logo
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   ├── projects/  # Project endpoints
│   │   │   ├── tasks/     # Task endpoints
│   │   │   ├── activity/  # Activity log endpoints
│   │   │   ├── users/     # User endpoints
│   │   │   └── seed/      # Database seeding
│   │   ├── auth/          # Auth pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── projects/      # Project pages
│   │   ├── kanban/        # Kanban board page
│   │   ├── activity/      # Activity log page
│   │   ├── teams/         # Teams page
│   │   └── settings/      # Settings page
│   ├── components/        # React components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── layout/       # Layout components
│   │   └── teams/        # Team management components
│   ├── lib/              # Utility functions
│   │   ├── auth.ts       # Authentication utilities
│   │   ├── db.ts         # Database connection
│   │   └── utils.ts      # General utilities
│   └── server/           # Server-side code
│       └── models/       # MongoDB models
│           ├── User.ts
│           ├── Project.ts
│           ├── Task.ts
│           ├── Column.ts
│           ├── ActivityLog.ts
│           └── Comment.ts
├── .env.local            # Environment variables (not committed)
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

#### POST `/api/auth/logout`
Logout current user.

#### GET `/api/auth/me`
Get current authenticated user.

### Project Endpoints

#### GET `/api/projects`
Get all projects (filtered by user role).

#### GET `/api/projects/[projectId]`
Get project by ID.

#### GET `/api/projects/[projectId]/tasks`
Get all tasks for a project.

#### GET `/api/projects/[projectId]/columns`
Get all columns for a project.

#### GET `/api/projects/[projectId]/activity`
Get activity logs for a project.

### User Endpoints

#### GET `/api/users`
Get all users (admin/manager only).

#### POST `/api/users`
Create a new user (admin/manager only).

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "globalRole": "member"
}
```

### Seed Endpoint

#### GET `/api/seed`
Seed the database with sample data.

---

## 🔐 Authentication

### How It Works

1. User logs in with email and password
2. Server validates credentials and generates JWT token
3. Token is stored in HTTP-only cookie
4. Subsequent requests include the cookie automatically
5. Server validates token on protected routes

### Protected Routes

All dashboard pages require authentication. Unauthenticated users are redirected to the login page.

### Role-Based Access

- **Admin**: Full access to all features, can create users (Manager/Member)
- **Manager**: Can manage projects and tasks, can create users (Member only)
- **Member**: Can view assigned projects and tasks, cannot create users

---

## 👤 User Roles

### Admin
- ✅ View all projects and users
- ✅ Create, edit, and delete projects
- ✅ Create users (Manager/Member roles)
- ✅ Manage all tasks
- ✅ View all activity logs
- ✅ Access analytics dashboard

### Manager
- ✅ View and manage assigned projects
- ✅ Create, edit, and delete tasks in their projects
- ✅ Create users (Member role only)
- ✅ View project activity logs
- ✅ Access analytics for their projects

### Member
- ✅ View assigned projects
- ✅ View and update assigned tasks
- ✅ View project activity logs
- ❌ Cannot create users
- ❌ Cannot create projects
- ❌ Limited analytics access

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Configure environment variables:
     - `MONGODB_URI`
     - `MONGODB_DB`
     - `AUTH_SECRET`
   - Click **Deploy**

3. **Seed Production Database**
   - After deployment, visit: `https://your-app.vercel.app/api/seed`
   - This will populate your production database

### Environment Variables in Vercel

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add the following:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `MONGODB_DB` - Database name (e.g., `orbitflow`)
   - `AUTH_SECRET` - Your secret key
   - `NEXT_TELEMETRY_DISABLED` - Set to `1` (optional)

### MongoDB Atlas Configuration

Ensure your MongoDB Atlas cluster allows connections from Vercel:
- Add `0.0.0.0/0` to Network Access (or Vercel's IP ranges)
- Ensure your database user has read/write permissions

---

## 🔧 Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to MongoDB

**Solutions**:
- Verify `MONGODB_URI` is correct in `.env.local`
- Check MongoDB Atlas Network Access settings
- Ensure database user credentials are correct
- Verify the database name in the connection string

### Authentication Issues

**Problem**: Login not working

**Solutions**:
- Ensure `AUTH_SECRET` is set in `.env.local`
- Check that the database is seeded with users
- Verify password hashing is working
- Check browser console for errors

### Build Errors

**Problem**: TypeScript errors during build

**Solutions**:
- Run `npm run lint` to identify issues
- Ensure all environment variables are set
- Check that all dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Port Already in Use

**Problem**: Port 3000 is already in use

**Solutions**:
- Kill the process using port 3000
- Use a different port: `PORT=3001 npm run dev`
- Or change the port in `package.json`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Update documentation for new features
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jalil Rehman**

- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: jalil@orbitflow.io

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [MongoDB](https://www.mongodb.com/) - The Database
- [Tailwind CSS](https://tailwindcss.com/) - The CSS Framework
- [Vercel](https://vercel.com/) - The Deployment Platform
- [Recharts](https://recharts.org/) - The Chart Library

---

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact the author via email
- Check the [Documentation](#-api-documentation) section

---

<div align="center">

**Made with ❤️ using Next.js, React, and MongoDB**

⭐ Star this repo if you find it helpful!

</div>
