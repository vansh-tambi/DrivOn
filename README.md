# DrivOn 🚗

A full-stack ride-sharing application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time communication using Socket.IO and Google Maps integration for location services.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [License](#license)

## ✨ Features

### For Users
- User registration and authentication
- Real-time ride booking
- Live driver tracking with Google Maps
- View available vehicles and fare estimates
- Ride history and profile management

### For Captains (Drivers)
- Captain registration with vehicle details
- Accept or decline ride requests
- Real-time navigation to pickup and drop locations
- Ride management and tracking
- Earnings tracking

### Core Features
- JWT-based authentication
- Real-time updates using Socket.IO
- Google Maps integration for routes and tracking
- Secure token blacklisting on logout
- Responsive UI with Tailwind CSS
- Live ride status updates

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Request validation

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **Google Maps API** - Maps and location services
- **GSAP** - Animations
- **React Icons** - Icon library

## 📁 Project Structure

```
DrivOn/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middlewares/      # Custom middlewares
│   ├── database/         # Database configuration
│   ├── app.js            # Express app configuration
│   ├── server.js         # Server entry point
│   └── socket.js         # Socket.IO configuration
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── context/      # React Context providers
    │   └── assets/       # Static assets
    ├── public/           # Public assets
    └── index.html        # Entry HTML
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas connection)
- **Google Maps API Key**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DrivOn
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NODE_ENV=development
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🎯 Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```

## 📚 API Documentation

Detailed API documentation is available in the [backend/README.md](backend/README.md) file.

### Main Endpoints

#### User Endpoints
- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile (Protected)
- `GET /users/logout` - Logout user

#### Captain Endpoints
- `POST /captains/register` - Register a new captain
- `POST /captains/login` - Captain login
- `GET /captains/profile` - Get captain profile (Protected)
- `GET /captains/logout` - Logout captain

#### Ride Endpoints
- `POST /rides/create` - Create a new ride request
- `GET /rides/:id` - Get ride details
- `POST /rides/:id/confirm` - Confirm a ride (Captain)
- `POST /rides/:id/start` - Start a ride (Captain)
- `POST /rides/:id/end` - End a ride (Captain)

#### Maps Endpoints
- `GET /maps/get-coordinates` - Get coordinates from address
- `GET /maps/get-distance-time` - Calculate distance and time
- `GET /maps/get-suggestions` - Get location suggestions

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are issued upon successful login
- Tokens are stored in cookies and/or local storage
- Protected routes require valid tokens
- Tokens are blacklisted upon logout

## 🌐 Real-time Features

Socket.IO is used for real-time features:
- Live ride tracking
- Driver location updates
- Ride status notifications
- Connection management between users and captains

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created with ❤️ by the DrivOn Team

---

For more information or support, please open an issue in the repository.
