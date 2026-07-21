# 🍱 Homemade Food Preparation & Delivery Website

A full-stack MERN application that provides healthy homemade meals through a monthly subscription model. The platform allows users to register, verify their account using OTP authentication, subscribe to meal plans, make payments, and manage their profile and payment history.

---

# 📌 Project Overview

The Homemade Food Preparation & Delivery Website is designed to connect customers with healthy homemade food providers through a simple and secure online platform.

Users can:

* Register and verify their account.
* Choose a monthly meal subscription plan.
* Make payments securely.
* Receive Email and WhatsApp notifications.
* Manage subscriptions and payment history.

The platform focuses on delivering fresh homemade meals to selected nearby locations and simplifies the entire food subscription process.

---

# 🎯 Project Objectives

* Provide healthy homemade meals to customers.
* Offer affordable monthly subscription plans.
* Enable secure user authentication and authorization.
* Automate Email and WhatsApp notifications.
* Maintain customer subscription and payment records.
* Deliver meals efficiently to selected nearby locations.

---

# ✨ Key Features

## 🔐 Authentication System

* User Registration
* User Login
* JWT Authentication
* Password Encryption using BCrypt
* Email OTP Verification
* WhatsApp OTP Verification
* Protected Routes

---

## 🍽️ Food Subscription Plans

### 🥗 Veg Plan

* ₹6500 per Month

### 🍗 Non-Veg Plan

* ₹7500 per Month

### 🎁 Additional Charge

* ₹1000 One-Time Lunch Box Setup Charge

---

## 🚚 Delivery Service

Customers receive:

* Breakfast
* Lunch
* Dinner

Delivery is available only in selected nearby locations.

---

## 🍲 Menu Management

* Display available homemade food items.
* Categorized food menu.
* Dynamic menu management using backend APIs.

---

## 💳 Payment Management

* Payment Simulation
* Transaction ID Generation
* Payment Status Tracking
* Payment History Management

Supported Payment Methods:

* UPI
* Debit/Credit Card
* Net Banking
* Cash

---

## 📧 Email Automation

After successful registration:

* Welcome Email Sent
* OTP Verification Email Sent

---

## 📱 WhatsApp Automation

After successful registration:

* Welcome WhatsApp Message
* OTP Verification Message

---

## 👤 User Profile Management

* View Profile
* Update Profile Information
* View Subscription Details
* View Payment History

---

# 🛠️ Technologies Used

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* React Icons
* CSS3

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* BCrypt.js
* CORS
* Dotenv

---

## Third-Party Services

* Nodemailer
* WhatsApp Web JS 

---

# 🏗️ System Architecture

```text
Frontend (React + Vite)
        ↓
REST APIs
        ↓
Backend (Node.js + Express.js)
        ↓
MongoDB Database
```

---

# 📂 Project Structure

```text
Homemade_food_delivery
│
├── frontend
│   │
│   ├── public
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── Backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── package.json
```

---

# 🖥️ Frontend Modules

## 📁 assets

Stores all static resources such as:

* Images
* Icons
* Logos
* Banners

---

## 📁 components

Contains reusable UI components such as:

* Navbar
* Footer
* Cards
* Buttons
* Forms
* Subscription Components

---

## 📁 pages

Contains all application pages:

* Home Page
* Login Page
* Registration Page
* OTP Verification Page
* Subscription Plans Page
* Payment Page
* Payment Success Page
* User Profile Page
* Payment History Page
* Confirmation Page

---

## 📁 services

Contains API service files responsible for communication between the frontend and backend using Axios.

Examples:

* Authentication Service
* Payment Service
* Subscription Service
* User Service

---

## App.jsx

Main application component responsible for:

* Routing
* Layout Management
* Rendering Pages

---

## main.jsx

Application entry point responsible for:

* Rendering React Application
* Loading Root Component

---

## index.css

Contains:

* Global Styling
* Responsive Design
* Custom CSS

---

# ⚙️ Backend Modules

## 📁 config

Contains database configuration files.

Example:

* MongoDB Atlas Connection Setup

---

## 📁 controllers

Contains business logic for:

* Authentication
* OTP Verification
* Subscription Management
* Payment Management
* User Management

---

## 📁 middleware

Contains middleware functions such as:

* JWT Authentication Middleware
* Error Handling Middleware

---

## 📁 models

Contains MongoDB Schemas.

### User Model

```javascript
fullName
email
mobile
password
location
emailVerified
mobileVerified
createdAt
```

### Subscription Model

```javascript
userId
planType
amount
lunchBoxCharge
totalAmount
paymentStatus
createdAt
```

### Payment Model

```javascript
userId
transactionId
amount
paymentMethod
paymentStatus
paymentDate
```

### OTP Model

```javascript
email
mobile
emailOtp
whatsappOtp
expiresAt
```

---

## 📁 routes

Contains API routes:

* Authentication Routes
* User Routes
* Subscription Routes
* Payment Routes

---

## 📁 utils

Contains utility functions:

* Email Service
* WhatsApp Service
* OTP Generator
* Helper Functions

---

## server.js

Responsible for:

* Express Server Setup
* Middleware Configuration
* Database Connection
* Route Configuration
* Server Initialization

---

# 🔗 API Modules

### Authentication APIs

* Register User
* Login User
* Send OTP
* Verify OTP

### User APIs

* Get User Profile
* Update User Profile

### Subscription APIs

* Create Subscription
* Get Subscription Details

### Payment APIs

* Make Payment
* Payment History
* Payment Status

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing using BCrypt
* Protected APIs
* Environment Variables
* OTP Verification
* Secure User Authentication Flow

---

# 🔄 Application Flow

```text
User Registration
        ↓
Email OTP Verification
        ↓
WhatsApp OTP Verification
        ↓
Login
        ↓
Choose Subscription Plan
        ↓
Payment
        ↓
Subscription Activated
        ↓
View Profile & Payment History
```

---

# 🚀 Future Enhancements

* Razorpay Payment Gateway Integration
* Admin Dashboard
* Order Tracking System
* Live Delivery Tracking
* Ratings and Reviews
* Coupon and Offers System
* Push Notifications
* Mobile Application

---

# 👨‍💻 Team Members

* Vempuluru Siva Kasthuri Prasad
* Dega Saiteja
* Yelchuru Reeshika
* Challa Renukumar

---

# 📖 Conclusion

The Homemade Food Preparation & Delivery Website is a complete MERN Stack application that simplifies homemade food subscription services by integrating secure authentication, OTP verification, payment management, email automation, and WhatsApp notifications into a single platform.