# ColoredCow Hiring Portal

A modern, full-stack application for managing a hiring pipeline. This project was built as part of an interview submission and features a public-facing application form for candidates and a premium HR dashboard for recruiters.

## 🚀 Features

### **Candidate Side (Public)**
- **Modern Job Form**: Clean, dark-themed interface for applying to open positions.
- **Dynamic Positions**: Job openings are fetched in real-time from the backend.
- **Resume Handling**: Secure file upload for PDFs and documents.
- **Automated Communication**: Instant email confirmation upon submission.

### **HR Dashboard (Private)**
- **Real-time Stats**: Track Total Applications, Last 30 Days volume, and Status distribution.
- **Advanced Tracking**: Sophisticated filtering by Job, City, College, and Graduation Year.
- **Workflow Management**: One-click Approve/Reject actions with note-taking.
- **Analytics & Reports**:
    - **Avg Time to Action**: Insights into recruitment efficiency.
    - **Job Trends**: Visual bar chart showing application volume per position.

## 🛠️ Technology Stack

- **Frontend**: React.js, Redux Toolkit, React Router, Axios, Tailwind CSS.
- **Backend**: Laravel 11, Sanctum (Auth), SQLite (Database).
- **Communication**: Blade Email Templates, Laravel Mail.
- **Design**: Premium custom CSS system with HSL-based color tokens.

## ⚙️ Project Setup

### **Prerequisites**
- PHP 8.2+
- Node.js 18+
- Composer

### **Backend Setup (hiring-api)**
1. `cd hiring-api`
2. `composer install`
3. `php artisan migrate --seed` (to initialize DB and sample data)
4. `php artisan storage:link`
5. `php artisan serve --port=8000`

### **Frontend Setup (hiring-frontend)**
1. `cd hiring-frontend`
2. `npm install`
3. `npm run dev`

## 🔑 Login Credentials

Access the HR Dashboard at `http://localhost:5173/login`:
- **Email:** `admin@coloredcow.com`
- **Password:** `password`

## 📂 Project Structure
- **/hiring-api**: Laravel 11 API project.
- **/hiring-frontend**: React.js frontend project.
