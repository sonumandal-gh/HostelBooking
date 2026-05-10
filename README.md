# HostelHub - Hostel Booking Application

A full-stack hostel booking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Authentication**: JWT-based Login and Signup.
- **Role-Based Access Control**: 
  - **Hosts**: Can add, edit, update, and delete their own hostels.
  - **Guests**: Can browse hostels, view details, book hostels, and save them to favourites.
- **Hostel Management**: Upload images, set prices, and manage property details.
- **Booking System**: Quick booking with confirmation.
- **Wishlist**: Save hostels to favourites for later.

## Tech Stack

- **Frontend**: React, Vite, Lucide Icons, Axios, CSS (Vanilla + Glassmorphism).
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Multer (for image uploads).

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hostel-booking.git
   cd hostel-booking
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` folder (use `.env.example` as a template).
   - Set your `MONGODB_URI` and `JWT_SECRET`.

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env` file in the `frontend` folder.
   - Set `VITE_API_URL=http://localhost:3001/api`.

### Running the App

1. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   cd ../frontend
   npm run dev
   ```

## Folder Structure

- `/backend`: Express API, models, controllers, and middlewares.
- `/frontend`: React application, components, and pages.

## License

MIT
