# 🚗 DrivOn – Frontend (React + Vite)

**DrivOn** is a real-time ride-booking frontend application designed to offer a seamless Uber-like experience. Built with **React**, **TailwindCSS**, **Vite**, and **Socket.io**, DrivOn connects with the backend to enable users to easily book rides, track vehicles, and interact with a live system.

---

## 🌐 Tech Stack

- ⚛️ **React** – For building dynamic, responsive UI components.
- ⚡ **Vite** – A fast build tool and development server for modern web applications.
- 🎨 **TailwindCSS** – Utility-first CSS framework for fast and efficient styling.
- 🔌 **Socket.io-client** – Real-time bi-directional communication with the backend.
- 🌍 **Google Maps API** – To integrate live location tracking and maps.
- 📦 **Axios** – Promise-based HTTP client for making API requests.

---

## 📁 Project Structure

/frontend ├── public/ → Static assets (vehicle icons, logos, etc.) ├── src/ │ ├── components/ → UI components (Tracking, Vehicle Panel, etc.) │ ├── context/ → Context API for user and socket state │ ├── pages/ → Page-level components (Home, Riding, etc.) │ ├── App.jsx → Root component │ └── main.jsx → Vite entry point ├── .env → Environment variables ├── tailwind.config.js → TailwindCSS customizations ├── vite.config.js → Vite config └── package.json → Dependencies and scripts


---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/drivon.git
cd drivon/frontend
```
### 2. Install Dependencies
```
npm install
```
### 3. Configure Environment Variables
Create a .env file in the /frontend directory with the following:
```
VITE_BASE_URL=https://your-backend-api.onrender.com
VITE_GOOGLE_MAPS_API=your_google_maps_api_key
```
✅ Ensure the backend is deployed and running properly.
### 4. Run Locally
```
npm run dev
```
This will start the frontend on http://localhost:5173.

# 🌍 Deployment Instructions (Render / Vercel / Netlify)
🔧 Render Deployment
Build Command


