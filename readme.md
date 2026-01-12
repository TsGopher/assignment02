# Vehicle Rental System – Backend API

## Project Information

**Project Name:** Vehicle Rental System  
**Live URL:** [https://vehicles-rent-api.vercel.app/](https://vehicles-rent-api.vercel.app/)

---

## Overview

The Vehicle Rental System is a comprehensive backend API designed for managing vehicle rentals. It provides secure authentication, role-based authorization, vehicle inventory management, customer profiles, and booking operations. Built with TypeScript and Express.js, it offers a scalable and maintainable backend solution for rental-based platforms.

---

## Features

### Vehicle Management
- Create, read, update, and delete vehicle records
- Real-time availability tracking
- Support for multiple vehicle types (car, bike, van, SUV)
- Dynamic pricing management
- Unique registration number validation

### User Management
- User registration and authentication
- Customer profile management
- Role-based user system (Admin and Customer)
- Email uniqueness validation
- Secure password storage

### Booking System
- Create and manage vehicle bookings
- Prevent double bookings with availability checks
- Handle vehicle returns
- Automated rental cost calculation based on daily rates
- Booking status tracking (active, cancelled, returned)
- Date validation to ensure end date is after start date

### Authentication & Authorization
- Password hashing using bcryptjs
- JWT-based authentication
- Role-based access control:
  - **Admin:** Full system access
  - **Customer:** Limited access to own bookings and profile
- Protected routes with middleware validation
- Request validation using Zod schemas

---

## Technology Stack

### Core Technologies
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM/Query Builder:** pg (node-postgres)

### Security & Authentication
- **Password Hashing:** bcryptjs
- **Token Management:** jsonwebtoken (JWT)
- **Validation:** Zod

### Development Tools
- **TypeScript Compiler:** TypeScript
- **Development Server:** tsx
- **Environment Variables:** dotenv

### Deployment
- **Platform:** Vercel
- **Build System:** TypeScript Compiler

---

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm or yarn package manager
- PostgreSQL database (local or remote)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment02
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   CONNECTION_STR=postgresql://username:password@localhost:5432/database_name
   PORT=3000
   JWT_SECRET=your-secret-jwt-key-here
   ```
   
   **Note:** Replace the placeholder values with your actual database credentials and a secure JWT secret key.

4. **Database Setup**
   
   The application automatically creates the required tables on startup:
   - `users` - Stores user accounts and authentication data
   - `vehicles` - Stores vehicle inventory
   - `bookings` - Stores booking records
   
   Ensure your PostgreSQL database is running and accessible with the connection string provided in `.env`.

5. **Build the project**
   ```bash
   npm run build
   ```
   
   This compiles TypeScript files from `src/` to `dist/`.

---

## Usage Instructions

### Development Mode

To run the application in development mode with hot-reload:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 3000). The application will automatically restart when you make changes to the source files.

### Production Mode

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   node dist/server.js
   ```

### API Endpoints

Once the server is running, you can access the API at `http://localhost:<PORT>` (or your deployed URL).

The API provides endpoints for:
- **Authentication:** `/api/auth/*` - User registration and login
- **Users:** `/api/users/*` - User profile management
- **Vehicles:** `/api/vehicles/*` - Vehicle CRUD operations
- **Bookings:** `/api/bookings/*` - Booking management

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `CONNECTION_STR` | PostgreSQL database connection string | Yes |
| `PORT` | Server port number | Yes |
| `JWT_SECRET` | Secret key for JWT token signing | Yes |

### Database Schema

The application creates three main tables:

- **users:** Stores user information (id, name, email, password, phone, role)
- **vehicles:** Stores vehicle information (id, vehicle_name, type, registration_number, daily_rent_price, availability_status)
- **bookings:** Stores booking information (id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)

---

## Project Structure

```
assignment02/
├── src/                    # TypeScript source files
│   ├── config/            # Configuration files
│   ├── middlewares/       # Express middlewares
│   ├── modules/           # Feature modules
│   │   ├── auth/         # Authentication module
│   │   ├── bookings/     # Booking module
│   │   ├── users/        # User module
│   │   └── vehicles/     # Vehicle module
│   └── server.ts         # Server entry point
├── dist/                  # Compiled JavaScript files
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

---

## License

ISC

---

## Author

Joynal Bin Tofajjal
