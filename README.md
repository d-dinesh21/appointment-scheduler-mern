Appointment Scheduler (MERN Stack)

A full-stack Appointment Scheduler web application built using the MERN stack.  
This project implements secure authentication, protected routes, and CRUD operations for managing appointments.

🚀 Features

- User Registration and Login with validation
- JWT-based authentication and authorization
- Password hashing using bcrypt
- Protected routes for authenticated users
- Create, view, and delete appointments
- Past dates disabled when creating appointments
- Search and filter appointments
- Responsive UI using Bootstrap (mobile, tablet, desktop friendly)

---

🛠️ Tech Stack

Frontend
- React
- React Router
- Axios
- Bootstrap

Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt for password security


🔐 Security Practices

- Passwords are never stored in plain text (bcrypt hashing)
- JWT used for stateless authentication
- Environment variables used for sensitive data
- Protected backend routes using middleware


📁 Project Structure

appointment-scheduler-mern/
│
├── Backend/
│ ├── config/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ └── src/
│
└── README.md


---

⚙️ Setup Instructions

Backend
```bash
cd Backend
npm install
npm run dev

Create a .env file inside Backend:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/appointment_db
JWT_SECRET=your_secret_key

Frontend
cd frontend
npm install
npm start

📈 Scalability & Future Enhancements

This project is designed with scalability in mind and can be extended to a complete Hospital Appointment Management System, including:

Role-Based Access Control (RBAC)

Admin

Doctor

Patient

Doctor and department management

Admin dashboard for managing users and schedules

Appointment status control (Approved / Cancelled / Completed)

Notifications and reminders

Production-ready deployment with frontend–backend integration.