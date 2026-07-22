
---

# 🍱 Homemade Food Preparation & Delivery Website

A full-stack **MERN Stack Homemade Food Preparation & Delivery Website** that provides fresh and healthy homemade meals through a monthly subscription model.

The platform allows users to register, verify their identity using **Email OTP and WhatsApp OTP**, log in securely using **JWT authentication**, select monthly meal subscription plans, make payments, receive Email and WhatsApp notifications, manage their profile, and view their own payment history.

The system also provides a separate **Admin role** with administrative access to manage food menu items and view all customer payment transactions.

---

# 📌 Project Overview

The **Homemade Food Preparation & Delivery Website** is designed to connect customers with homemade food providers through a secure and user-friendly online platform.

The application follows a subscription-based food delivery model where customers can choose between Veg and Non-Veg monthly meal plans.

The system provides separate access levels for:

### 👤 User

Users can:

* Register an account.
* Verify Email and WhatsApp OTP.
* Login securely.
* View available food menu.
* View subscription plans.
* Select meal plans.
* Make payments.
* View their own payment history.
* View individual payment details.
* Manage their profile.

### 👨‍💼 Admin

Admins can:

* Login through Admin Login.
* Access protected Admin features.
* Add new food menu items.
* Edit existing food menu items.
* Delete food menu items.
* Manage dynamic food menu.
* View all customer payment transactions.
* View customer transaction details.

The system uses **role-based authorization** to ensure that users can access only the resources permitted to them.

---

# 🎯 Project Objectives

* Provide healthy homemade meals to customers.
* Offer affordable monthly subscription plans.
* Provide secure User and Admin authentication.
* Implement JWT-based authorization.
* Implement role-based access control.
* Verify users using Email and WhatsApp OTP.
* Automate Email and WhatsApp notifications.
* Maintain customer subscription records.
* Maintain secure payment transaction records.
* Allow users to view only their own payment history.
* Allow admins to view all payment transactions.
* Provide dynamic Admin menu management.
* Deliver meals efficiently to selected nearby locations.

---

# ✨ Key Features

---

## 🔐 Authentication & Authorization System

The application provides a secure authentication system using JWT and BCrypt password encryption.

### User Authentication

* User Registration
* User Login
* JWT Authentication
* Password Encryption using BCrypt
* Email OTP Verification
* WhatsApp OTP Verification
* Protected Routes
* Protected APIs
* User Role Validation

### Admin Authentication

* Separate Admin Login
* Admin Role Validation
* JWT Authentication
* Protected Admin APIs
* Admin-only Menu Management
* Admin-only Access to All Payment Transactions

### Role-Based Access

The application supports two main roles:

```text
User
Admin
```

The backend validates the authenticated user's role before allowing access to protected resources.

---

# 📱 OTP Verification System

During user registration, the system generates two separate OTPs.

```text
Registration
      ↓
Email OTP Generated
      ↓
WhatsApp OTP Generated
      ↓
Email OTP Sent
      ↓
WhatsApp OTP Sent
      ↓
User Enters Both OTPs
      ↓
OTP Verification
      ↓
Registration Allowed
```

### OTP Features

* Email OTP Generation
* WhatsApp OTP Generation
* Email OTP Verification
* WhatsApp OTP Verification
* OTP Expiration
* Verification Status Tracking

A user cannot complete registration without successful OTP verification.

---

# 🍽️ Food Subscription Plans

The platform provides monthly subscription plans.

## 🥗 Veg Plan

```text
₹6500 / Month
```

## 🍗 Non-Veg Plan

```text
₹7500 / Month
```

## 🎁 Lunch Box Setup Charge

```text
₹1000 One-Time Charge
```

The lunch box setup charge applies as an additional first-month charge.

---

# 🍴 Daily Meal Service

Customers receive three meals per day.

```text
Breakfast
    ↓
Lunch
    ↓
Dinner
```

The menu is dynamically loaded from the backend database.

Food items are categorized into:

* Breakfast
* Lunch
* Dinner

---

# 🚚 Delivery Service

The platform provides homemade food delivery to selected nearby locations.

Customers can select their available delivery location during registration or subscription.

The system is designed to support location-based delivery service.

---

# 🍲 Dynamic Menu Management

The application provides dynamic menu management.

## 👤 User Access

Users can:

* View available menu items.
* View food categories.
* View food descriptions.
* View food prices.
* View food images.

Users have **read-only access** to the menu.

---

## 👨‍💼 Admin Access

Admins can:

* Add Menu Item
* Edit Menu Item
* Delete Menu Item

Admin menu fields include:

```text
Food Name
Category
Price
Description
Image URL
```

Menu categories include:

```text
Breakfast
Lunch
Dinner
```

The Admin Menu Management system is protected using JWT authentication and Admin role authorization.

---

# 💳 Payment Management

The application includes a payment simulation system.

Payment records contain transaction information and are stored in MongoDB.

### Payment Features

* Payment Simulation
* Transaction ID Generation
* Payment Status Tracking
* Subscription Payment Status Update
* Payment History
* Payment Details
* User-specific Payment History
* Admin Payment Management

### Supported Payment Methods

* UPI
* Debit/Credit Card
* Net Banking
* Cash

---

# 🔒 Payment History Security

Payment history follows role-based access control.

### 👤 User

A normal user can view:

```text
Only their own transactions
```

The backend filters payment records using the logged-in user's ID.

### 👨‍💼 Admin

An admin can view:

```text
All customer transactions
```

The backend identifies the user's role from the JWT token.

```text
Admin
   ↓
View All Payments

User
   ↓
View Own Payments Only
```

This prevents one user from accessing another user's payment information.

---

# 🧾 Payment Details Security

Individual payment details are also protected.

A user can view a payment only if the payment belongs to their own account.

Admins can access payment details of all users.

The backend performs an authorization check before returning payment details.

---

# 🆔 Transaction Management

Each successful payment generates a unique transaction ID.

Example:

```text
TXN1723456789012
```

Payment records include information such as:

```text
User ID
Transaction ID
Amount
Payment Method
Payment Status
Created Date
```

---

# 📧 Email Automation

The application uses an Email Service for automated communication.

### Registration

After successful registration:

```text
User Registration
      ↓
Welcome Email Sent
```

### OTP Verification

During registration:

```text
OTP Generated
      ↓
OTP Sent to Email
```

The system provides automated email communication using **Nodemailer**.

---

# 📱 WhatsApp Automation

The application uses **WhatsApp Web JS** for WhatsApp communication.

### Registration

After successful registration:

```text
User Registration
      ↓
Welcome WhatsApp Message
```

### OTP Verification

During registration:

```text
OTP Generated
      ↓
OTP Sent to WhatsApp
```

---

# 🔄 WhatsApp Persistent Authentication

The WhatsApp client uses:

```javascript
LocalAuth
```

The authentication session is stored locally using the `.wwebjs_auth` directory.

This allows the application to maintain the WhatsApp session after:

* Backend restart
* Nodemon restart
* System restart

Normally, the QR code needs to be scanned only during the initial authentication.

```text
First Run
    ↓
QR Code
    ↓
Scan QR
    ↓
WhatsApp Authenticated
    ↓
Session Saved
    ↓
Backend Restart
    ↓
Session Restored
    ↓
No New QR Required
```

The session is expected to remain active until the WhatsApp account is manually logged out or unlinked.

---

# 👤 User Profile Management

Authenticated users can access their profile through protected routes.

Features include:

* View Profile
* View User Information
* View Account Details
* Manage Profile Information
* View Payment History

Profile APIs are protected using JWT authentication.

---

# 👨‍💼 Admin Features

The Admin role provides additional administrative capabilities.

### Admin Dashboard / Admin Features

* Admin Login
* Admin Authentication
* Role-based Authorization
* Menu Management
* Add Menu Items
* Edit Menu Items
* Delete Menu Items
* View All Payment Transactions
* View Customer Transaction Details

Admin APIs are protected using authentication middleware and role-based authorization.

---

# 🛠️ Technologies Used

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* React Icons
* CSS3
* JavaScript ES6+

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
* Puppeteer
* QRCode Terminal

---

# 🏗️ System Architecture

```text
                ┌──────────────────────┐
                │   React Frontend     │
                │      + Vite          │
                └──────────┬───────────┘
                           │
                           │ Axios / REST API
                           │
                           ▼
                ┌──────────────────────┐
                │  Node.js + Express   │
                │      Backend         │
                └──────────┬───────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
         Authentication  Payment      Menu
              │            │            │
              └────────────┼────────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │      MongoDB         │
                │       Atlas          │
                └──────────────────────┘

External Services:

Backend
   │
   ├── Nodemailer
   │
   └── WhatsApp Web JS
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
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .gitignore
│
├── Backend
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .wwebjs_auth
│   ├── .wwebjs_cache
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── README.md
└── package.json
```

> **Note:** `.env`, `.wwebjs_auth`, `.wwebjs_cache`, and `node_modules` should not be committed to GitHub.

---

# 🖥️ Frontend Modules

## 📁 assets

Stores static resources such as:

* Images
* Icons
* Logos
* Banners

---

## 📁 components

Contains reusable UI components such as:

* Home Page
* Menu Display
* Subscription Plans
* Delivery Options
* Navigation Components
* Reusable Cards
* Forms

---

## 📁 pages

Contains application pages such as:

* Home Page
* Registration Page
* Login Page
* User Login
* Admin Login
* OTP Verification Page
* User Profile Page
* Subscription Plans Page
* Order Summary Page
* Payment Page
* Payment Success Page
* Payment History Page
* Payment Details Page
* Confirmation Page

---

## 📁 services

Contains API service files responsible for frontend-backend communication using Axios.

Examples:

* Authentication Service
* Payment Service
* Subscription Service
* User Service
* Menu Service

---

## App.jsx

The main React application component responsible for:

* Browser Routing
* Page Navigation
* Application Layout
* User/Admin Role Detection
* Menu Data Loading
* Admin Menu Management
* Add Menu Item
* Edit Menu Item
* Delete Menu Item
* Navigation Dropdown
* Protected UI Features

---

## main.jsx

Application entry point responsible for:

* Rendering the React application.
* Loading the root App component.

---

## index.css

Contains:

* Global Styling
* Responsive Design
* Custom CSS
* Application-wide UI styles

---

# ⚙️ Backend Modules

## 📁 config

Contains configuration files for:

* MongoDB Database Connection
* Environment Configuration

---

## 📁 controllers

Contains business logic for:

* Authentication
* User Registration
* User Login
* Admin Login
* OTP Verification
* User Profile
* Menu Management
* Subscription Management
* Payment Management

---

## 📁 middleware

Contains middleware functions such as:

* JWT Authentication Middleware
* Protected Route Middleware
* Role-based Authorization

The authentication middleware:

1. Reads the JWT token.
2. Verifies the token.
3. Finds the authenticated user.
4. Attaches the user to `req.user`.
5. Allows access to protected APIs.

---

## 📁 models

Contains MongoDB Mongoose Schemas.

### User Model

```text
fullName
email
mobile
password
location
role
emailVerified
mobileVerified
createdAt
```

The `role` field identifies whether the account belongs to:

```text
user
admin
```

---

### Subscription Model

```text
userId
planType
amount
lunchBoxCharge
totalAmount
paymentStatus
createdAt
```

---

### Payment Model

```text
userId
transactionId
amount
paymentMethod
paymentStatus
createdAt
```

---

### OTP Model

```text
email
mobile
emailOtp
whatsappOtp
verified
expiresAt
```

---

### Menu Model

```text
foodName
category
price
description
image
createdAt
```

---

# 📁 Routes

The backend provides API routes for:

* Authentication
* User Management
* Menu Management
* Subscription Management
* Payment Management

---

# 🔗 API Modules

## 🔐 Authentication APIs

### Register

```http
POST /api/auth/register
```

### User Login

```http
POST /api/auth/user/login
```

### Admin Login

```http
POST /api/auth/admin/login
```

### General Login

```http
POST /api/auth/login
```

### Send OTP

```http
POST /api/auth/send-otp
```

### Verify OTP

```http
POST /api/auth/verify-otp
```

### Get Profile

```http
GET /api/auth/profile
```

Requires JWT authentication.

---

# 🍲 Menu APIs

### Get Menu

```http
GET /api/menu
```

### Add Menu Item

```http
POST /api/menu
```

Admin access required.

### Update Menu Item

```http
PUT /api/menu/:id
```

Admin access required.

### Delete Menu Item

```http
DELETE /api/menu/:id
```

Admin access required.

---

# 💳 Payment APIs

### Create Payment

```http
POST /api/payment
```

Requires authenticated user.

### Get Payment History

```http
GET /api/payment/history
```

Behavior:

```text
Admin → All Payments

User → Own Payments Only
```

### Get Payment Details

```http
GET /api/payment/:id
```

Behavior:

```text
Admin → Can View Any Payment

User → Can View Own Payment Only
```

---

# 📦 Subscription APIs

The Subscription module manages:

* Create Subscription
* View Subscription
* Plan Type
* Subscription Amount
* Lunch Box Charge
* Total Amount
* Payment Status

---

# 🔒 Security Features

The application implements multiple security mechanisms.

### JWT Authentication

Used for secure user authentication.

### Password Hashing

Passwords are encrypted using:

```text
BCrypt.js
```

### Protected APIs

Sensitive APIs require a valid JWT token.

### Role-Based Authorization

Admin and User roles have different permissions.

### User Payment Isolation

Users can access only their own payment records.

### Admin Payment Access

Admins can access all customer payment transactions.

### OTP Verification

Registration requires Email and WhatsApp OTP verification.

### Environment Variables

Sensitive configuration values are stored in `.env`.

### CORS

Cross-Origin Resource Sharing is configured for frontend-backend communication.

---

# 🔄 Complete Application Flow

```text
User Opens Website
        ↓
View Home Page
        ↓
View Dynamic Food Menu
        ↓
Register Account
        ↓
Enter Email + Mobile
        ↓
Email OTP Generated
        ↓
WhatsApp OTP Generated
        ↓
Verify Both OTPs
        ↓
Complete Registration
        ↓
Welcome Email Sent
        ↓
Welcome WhatsApp Message Sent
        ↓
User Login
        ↓
JWT Token Generated
        ↓
Choose Subscription Plan
        ↓
Order Summary
        ↓
Payment
        ↓
Transaction ID Generated
        ↓
Payment Successful
        ↓
Subscription Payment Status Updated
        ↓
View Payment History
        ↓
User Sees Own Transactions
```

---

# 👨‍💼 Admin Flow

```text
Admin Opens Website
        ↓
Admin Login
        ↓
JWT Token Generated
        ↓
Admin Role Verified
        ↓
Admin Access Granted
        ↓
Manage Food Menu
        ↓
Add / Edit / Delete Menu
        ↓
View All Customer Payments
        ↓
View Payment Details
```

---

# 👤 User vs Admin Access

| Feature                  | User | Admin |
| ------------------------ | ---- | ----- |
| Register                 | ✅    | -     |
| User Login               | ✅    | -     |
| Admin Login              | -    | ✅     |
| Email OTP                | ✅    | -     |
| WhatsApp OTP             | ✅    | -     |
| View Menu                | ✅    | ✅     |
| Add Menu                 | ❌    | ✅     |
| Edit Menu                | ❌    | ✅     |
| Delete Menu              | ❌    | ✅     |
| View Own Payments        | ✅    | ✅     |
| View All Payments        | ❌    | ✅     |
| View Own Payment Details | ✅    | ✅     |
| View Any Payment Details | ❌    | ✅     |
| View Profile             | ✅    | ✅     |
| JWT Protected APIs       | ✅    | ✅     |

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Sivavempuluru14/homemade-food-delivery.git
```

---

## 2️⃣ Navigate to Project

```bash
cd homemade-food-delivery
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 4️⃣ Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 5️⃣ Install Backend Dependencies

Open a new terminal:

```bash
cd Backend
npm install
```

---

## 6️⃣ Configure Environment Variables

Create a `.env` file inside the Backend folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 7️⃣ Start Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 🧪 Development Environment

The project uses:

### Frontend

```text
Vite Development Server
Port: 5173
```

### Backend

```text
Node.js + Express
Port: 5000
```

### Database

```text
MongoDB Atlas
```

---

# 🔄 Frontend-Backend Communication

```text
React Frontend
      ↓
Axios Request
      ↓
Express REST API
      ↓
JWT Middleware
      ↓
Role Authorization
      ↓
Controller
      ↓
Mongoose
      ↓
MongoDB Atlas
      ↓
Response
      ↓
React UI
```

---

# 🔐 Protected API Flow

```text
User/Admin Login
        ↓
JWT Token Generated
        ↓
Token Stored in Frontend
        ↓
Axios Sends Bearer Token
        ↓
Backend protect Middleware
        ↓
JWT Verification
        ↓
Find User
        ↓
req.user
        ↓
Role Check
        ↓
Allow / Deny Request
```

---

# 🔮 Future Enhancements

* Razorpay Payment Gateway Integration
* Real Payment Processing
* Separate Admin Dashboard UI
* Advanced Admin Analytics
* Order Tracking System
* Live Delivery Tracking
* Delivery Partner Management
* Ratings and Reviews
* Coupon and Offers System
* Push Notifications
* Mobile Application
* Advanced Role-Based Access Control
* Customer Order Management
* Automated Subscription Renewal
* Invoice Generation
* Cloud Image Storage
* Production Deployment

---

# 👨‍💻 Team Members

* **Vempuluru Siva Kasthuri Prasad**
* **Dega Saiteja**
* **Yelchuru Reeshika**
* **Challa Renukumar**

---

# 📖 Conclusion

The **Homemade Food Preparation & Delivery Website** is a complete MERN Stack application designed to simplify homemade food subscription and delivery services.

The application combines:

* Secure User Authentication
* Admin Authentication
* JWT Authorization
* Role-Based Access Control
* Email OTP Verification
* WhatsApp OTP Verification
* Monthly Food Subscriptions
* Dynamic Menu Management
* Payment Simulation
* Secure Payment History
* User-Specific Transaction Access
* Admin Transaction Management
* Email Automation
* WhatsApp Automation
* User Profile Management

The system provides a complete workflow from **user registration and OTP verification to subscription, payment, and transaction management**, while maintaining separate permissions for **Users and Administrators**.

---
