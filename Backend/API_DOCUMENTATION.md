# 🌐 Backend API Documentation

## Base URL

```http
http://localhost:5000
````

---

# 🔐 Authentication APIs

Authentication module handles:

* User Registration
* Email OTP Verification
* WhatsApp OTP Verification
* User Login
* JWT Authentication
* User Profile Access

---

# 1. Send OTP API

## Method

```http
POST
```

## Endpoint

```http
/api/auth/send-otp
```

---

## Description

This API sends:

* Email OTP through Nodemailer
* WhatsApp OTP through whatsapp-web.js

before user registration.

---

## Request Body

```json
{
  "email": "siva@gmail.com",
  "mobile": "9876543210"
}
```

---

## Success Response

```json
{
  "message": "Email OTP and WhatsApp OTP Sent Successfully"
}
```

---

## OTP Database Structure

After sending OTP:

```json
{
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "emailOtp": "483921",
  "whatsappOtp": "716504",
  "verified": false
}
```

---

# 2. Verify OTP API

## Method

```http
POST
```

## Endpoint

```http
/api/auth/verify-otp
```

---

## Description

This API verifies:

* Email OTP
* WhatsApp OTP

Only after successful verification user can register.

---

## Request Body

```json
{
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "emailOtp": "483921",
  "whatsappOtp": "716504"
}
```

---

## Success Response

```json
{
  "message": "Email and Mobile Verified Successfully"
}
```

---

## OTP Status After Verification

Database will update:

```json
{
  "verified": true
}
```

---

## Error Responses

### Invalid Email OTP

```json
{
  "message": "Invalid Email OTP"
}
```

---

### Invalid WhatsApp OTP

```json
{
  "message": "Invalid WhatsApp OTP"
}
```

---

### Expired OTP

```json
{
  "message": "OTP Expired or Not Found"
}
```

---

# 3. Register User API

## Method

```http
POST
```

## Endpoint

```http
/api/auth/register
```

---

## Description

Creates a new user account.

Before registration backend checks:

* Email OTP verification
* WhatsApp OTP verification

If OTP is not verified, account creation is blocked.

---

## Request Body

```json
{
  "fullName": "Siva",
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "password": "Password@123",
  "location": "Guindy"
}
```

---

## OTP Security Validation

Backend checks:

```json
{
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "verified": true
}
```

---

## If OTP Not Verified

Response:

```json
{
  "message": "Please verify OTP first"
}
```

---

## Success Response

```json
{
  "message": "Registration Successful",
  "user": {
    "_id": "user_id",
    "fullName": "Siva",
    "email": "siva@gmail.com",
    "mobile": "9876543210",
    "location": "Guindy",
    "emailVerified": true,
    "mobileVerified": true
  }
}
```

---

## Error Response

### Existing User

```json
{
  "message": "User already exists"
}
```

---

# 4. Login User API

## Method

```http
POST
```

## Endpoint

```http
/api/auth/login
```

---

## Description

Authenticates registered users and generates JWT token.

---

## Request Body

```json
{
  "email": "siva@gmail.com",
  "password": "Password@123"
}
```

---

## Success Response

```json
{
  "message": "Login Successful",
  "token": "JWT_TOKEN",
  "user": {
    "_id": "user_id",
    "fullName": "Siva",
    "email": "siva@gmail.com",
    "mobile": "9876543210",
    "location": "Guindy"
  }
}
```

---

## Error Responses

### User Not Found

```json
{
  "message": "User not found"
}
```

---

### Invalid Password

```json
{
  "message": "Invalid Password"
}
```

---

# 5. Get User Profile API

## Method

```http
GET
```

## Endpoint

```http
/api/auth/profile
```

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Success Response

```json
{
  "_id": "user_id",
  "fullName": "Siva",
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "location": "Guindy"
}
```

---

## Error Response

```json
{
  "message": "No Token, Authorization Denied"
}
```

---

# 🔒 Authentication Flow

```
User enters Email + Mobile

          ↓

Send OTP API

          ↓

Email OTP Sent
+
WhatsApp OTP Sent

          ↓

Verify OTP API

          ↓

OTP Verified
(verified:true)

          ↓

Register User API

          ↓

Create Account

          ↓

Welcome Email Sent

          ↓

Welcome WhatsApp Message Sent
```

---


# 🍽️ Food Menu APIs

Food Menu module handles:

- Adding food items
- Fetching available food items
- Updating food details
- Deleting food items

---

# 1. Add Food Item API

## Method

```http
POST
````

## Endpoint

```http
/api/menu
```

---

## Description

Admin can add new homemade food items into the menu.

---

## Request Body

```json
{
  "foodName": "Idli",
  "category": "Breakfast",
  "price": 40,
  "description": "Soft Idli with Chutney",
  "image": "idli.jpg"
}
```

---

## Success Response

```json
{
  "message": "Food Item Added Successfully",
  "menu": {
    "_id": "food_id",
    "foodName": "Idli",
    "category": "Breakfast",
    "price": 40,
    "description": "Soft Idli with Chutney",
    "image": "idli.jpg"
  }
}
```

---

# 2. Get All Food Items API

## Method

```http
GET
```

## Endpoint

```http
/api/menu
```

---

## Description

Returns all available food items.

---

## Success Response

```json
[
  {
    "_id": "food_id",
    "foodName": "Idli",
    "category": "Breakfast",
    "price": 40,
    "description": "Soft Idli with Chutney",
    "image": "idli.jpg"
  }
]
```

---

# 3. Update Food Item API

## Method

```http
PUT
```

## Endpoint

```http
/api/menu/:id
```

---

## Example

```http
/api/menu/food_id
```

---

## Request Body

```json
{
  "foodName": "Masala Idli",
  "category": "Breakfast",
  "price": 60,
  "description": "Hot Masala Idli",
  "image": "masala-idli.jpg"
}
```

---

## Success Response

```json
{
  "message": "Food Item Updated Successfully"
}
```

---

# 4. Delete Food Item API

## Method

```http
DELETE
```

## Endpoint

```http
/api/menu/:id
```

---

## Example

```http
/api/menu/food_id
```

---

## Success Response

```json
{
  "message": "Food Item Deleted Successfully"
}
```

---

# 📦 Subscription APIs

Subscription module manages:

* Monthly meal plans
* Veg subscription
* Non-Veg subscription
* Lunch box setup charges

---

# Subscription Plans

## Veg Plan

```text
Monthly Charge: ₹6500
Lunch Box Setup: ₹1000
Total Amount: ₹7500
```

---

## Non-Veg Plan

```text
Monthly Charge: ₹7500
Lunch Box Setup: ₹1000
Total Amount: ₹8500
```

---

# 1. Create Subscription API

## Method

```http
POST
```

## Endpoint

```http
/api/subscriptions
```

---

## Description

Creates a monthly food subscription for a registered user.

---

## Veg Plan Request

```json
{
  "userId": "user_id",
  "planType": "Veg",
  "amount": 6500,
  "lunchBoxCharge": 1000,
  "totalAmount": 7500,
  "paymentStatus": "Pending"
}
```

---

## Non-Veg Plan Request

```json
{
  "userId": "user_id",
  "planType": "Non-Veg",
  "amount": 7500,
  "lunchBoxCharge": 1000,
  "totalAmount": 8500,
  "paymentStatus": "Pending"
}
```

---

## Success Response

```json
{
  "message": "Subscription Created Successfully"
}
```

---

# 2. Get All Subscriptions API

## Method

```http
GET
```

## Endpoint

```http
/api/subscriptions
```

---

## Description

Returns all subscription records.

---

## Success Response

```json
[
  {
    "_id": "subscription_id",
    "userId": "user_id",
    "planType": "Veg",
    "amount": 6500,
    "lunchBoxCharge": 1000,
    "totalAmount": 7500,
    "paymentStatus": "Pending"
  }
]
```

---

# 💳 Payment APIs

Payment module handles:

* Payment creation
* Payment history
* Payment details

---

# 1. Create Payment API

## Method

```http
POST
```

## Endpoint

```http
/api/payment
```

---

## Description

Stores payment transaction details after subscription payment.

---

## Request Body

```json
{
  "userId": "user_id",
  "transactionId": "TXN123456",
  "amount": 7500,
  "paymentMethod": "UPI",
  "paymentStatus": "Success"
}
```

---

## Success Response

```json
{
  "message": "Payment Successful",
  "payment": {
    "_id": "payment_id",
    "userId": "user_id",
    "transactionId": "TXN123456",
    "amount": 7500,
    "paymentMethod": "UPI",
    "paymentStatus": "Success",
    "paymentDate": "2026-07-14T12:00:00.000Z",
    "createdAt": "2026-07-14T12:00:00.000Z",
    "updatedAt": "2026-07-14T12:00:00.000Z"
  }
}
```

---

## Error Response

```json
{
  "message": "Payment Failed"
}
```

---

# 2. Get Payment History API

## Method

```http
GET
```

## Endpoint

```http
/api/payment/history
```

---

## Description

Returns all payments made by users.

---

## Success Response

```json
[
  {
    "_id": "payment_id",
    "userId": "user_id",
    "transactionId": "TXN123456",
    "amount": 7500,
    "paymentMethod": "UPI",
    "paymentStatus": "Success",
    "paymentDate": "2026-07-14T12:00:00.000Z",
    "createdAt": "2026-07-14T12:00:00.000Z",
    "updatedAt": "2026-07-14T12:00:00.000Z"
  }
]
```

---

## Error Response

```json
{
  "message": "No Payment History Found"
}
```

---

# 3. Get Payment By ID API

## Method

```http
GET
```

## Endpoint

```http
/api/payment/:id
```

---

## Example

```http
/api/payment/6874f123456789
```

---

## Success Response

```json
{
  "_id": "payment_id",
  "userId": "user_id",
  "transactionId": "TXN123456",
  "amount": 7500,
  "paymentMethod": "UPI",
  "paymentStatus": "Success",
  "paymentDate": "2026-07-14T12:00:00.000Z",
  "createdAt": "2026-07-14T12:00:00.000Z",
  "updatedAt": "2026-07-14T12:00:00.000Z"
}
```

---

## Error Response

```json
{
  "message": "Payment not found"
}
```

---

# ⚙️ Environment Variables (.env)

Create a `.env` file inside the `Backend` folder.

---

## Environment Configuration

```env
PORT=5000

# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<CLUSTER_NAME>.mongodb.net/HomemadeFoodDB?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=your_secret_key


# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
````

---

## Example `.env`

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/HomemadeFoodDB?retryWrites=true&w=majority

JWT_SECRET=homemadefoodsecret


EMAIL_USER=example@gmail.com
EMAIL_PASS=your_app_password
```

---

# 📋 Environment Variables Summary

| Variable   | Description                           | Example                                                            |
| ---------- | ------------------------------------- | ------------------------------------------------------------------ |
| PORT       | Backend server running port           | 5000                                                               |
| MONGO_URI  | MongoDB Atlas connection string       | mongodb+srv://username:password@cluster.mongodb.net/HomemadeFoodDB |
| JWT_SECRET | Secret key for JWT authentication     | homemadefoodsecret                                                 |
| EMAIL_USER | Gmail account used for sending emails | [example@gmail.com](mailto:example@gmail.com)                      |
| EMAIL_PASS | Gmail App Password for Nodemailer     | xxxxxxxx                                                           |

---

# 📧 Email Notification

The application uses **Nodemailer** for automated email communication.

---

## Email Service

Technology Used:

* Node.js
* Express.js
* Nodemailer
* Gmail App Password

---

# Email Workflow

```text
User Registration

        ↓

User Data Saved in MongoDB

        ↓

sendEmail()

        ↓

Welcome Email Sent Automatically
```

---

# Email Notification Example

```
Hi Siva,

Welcome to Homemade Food Delivery.

Your registration has been completed successfully.

Thank you for joining with us.
```

---

# 💬 WhatsApp Automation

## WhatsApp Service

Previously Twilio WhatsApp API was used.

Now Twilio has been removed.

WhatsApp automation is implemented using:

* whatsapp-web.js
* WhatsApp Web Session
* QR Code Authentication

---

# Installation

Install required packages:

```bash
npm install whatsapp-web.js qrcode-terminal
```

---

# WhatsApp Client Configuration

Example:

```javascript
const { Client, LocalAuth } = require("whatsapp-web.js");


const client = new Client({

    authStrategy: new LocalAuth()

});
```

---

# QR Code Authentication Flow

First time backend server starts:

```text
Server Started

        ↓

WhatsApp Client Initializing

        ↓

QR Code Generated

        ↓

Scan QR Code using WhatsApp

        ↓

WhatsApp Client Ready
```

---

After successful login:

```
✅ WhatsApp Client Ready
```

Session will be stored automatically.

Next server restart:

```
Server Start

        ↓

Existing Session Loaded

        ↓

No QR Scan Required
```

---

# WhatsApp OTP Flow

```text
User enters Email + Mobile

        ↓

Generate OTP

        ↓

Email OTP Sent

        ↓

WhatsApp OTP Sent
(using whatsapp-web.js)

        ↓

User verifies OTP
```

---

# Welcome WhatsApp Message Flow

```text
Successful Registration

        ↓

sendWhatsapp()

        ↓

whatsapp-web.js

        ↓

Welcome WhatsApp Message Sent
```

---

# WhatsApp Message Example

```
Hi Siva,

Welcome to Homemade Food Delivery.

Your registration is completed successfully.

Thank you for joining us.
```

---

# 🛠 Technology Stack

| Feature             | Technology             |
| ------------------- | ---------------------- |
| Frontend            | React.js               |
| Backend             | Node.js + Express.js   |
| Database            | MongoDB Atlas          |
| Authentication      | JWT                    |
| Password Security   | bcrypt                 |
| Email Service       | Nodemailer             |
| WhatsApp Automation | whatsapp-web.js        |
| OTP Management      | MongoDB OTP Collection |
| API Testing         | Postman                |

---

# 🔒 Security Notes

The application follows these security practices:

## 1. OTP Verification

* User must verify Email OTP.
* User must verify WhatsApp OTP.
* Registration is blocked without OTP verification.

---

## 2. Password Security

Passwords are encrypted using bcrypt before storing in database.

Example:

```
Original Password:

Password@123


Stored Password:

$2a$10$xxxxxxxxxxxxxxxx
```

---

## 3. JWT Authentication

Protected APIs require JWT token.

Example:

```http
Authorization: Bearer JWT_TOKEN
```

---

## 4. Environment Security

Never upload `.env` file to GitHub.

Add `.env` into `.gitignore`.

Example:

```gitignore
.env
```

---

## 5. Sensitive Data Protection

Never expose:

* Database password
* JWT secret key
* Email password
* API credentials

---

# 🔄 Complete Application Flow

```text
User Registration

        ↓

Send OTP API

        ↓

Email OTP
+
WhatsApp OTP

        ↓

Verify OTP API

        ↓

OTP Verified

        ↓

Register User API

        ↓

Create User Account

        ↓

Welcome Email Sent

        ↓

Welcome WhatsApp Message Sent

        ↓

User Login

        ↓

JWT Token Generated

        ↓

Access Protected APIs
```

---

# 📋 Complete API Summary

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | /api/auth/send-otp   | Send Email and WhatsApp OTP       |
| POST   | /api/auth/verify-otp | Verify Email and WhatsApp OTP     |
| POST   | /api/auth/register   | Register New User                 |
| POST   | /api/auth/login      | Login User and Generate JWT Token |
| GET    | /api/auth/profile    | Get Logged-in User Profile        |
| POST   | /api/menu            | Add New Food Item                 |
| GET    | /api/menu            | Get All Food Items                |
| PUT    | /api/menu/:id        | Update Food Item                  |
| DELETE | /api/menu/:id        | Delete Food Item                  |
| POST   | /api/subscriptions   | Create Subscription               |
| GET    | /api/subscriptions   | Get All Subscriptions             |
| POST   | /api/payment         | Create Payment                    |
| GET    | /api/payment/history | Get Payment History               |
| GET    | /api/payment/:id     | Get Payment Details By ID         |

---

# ✅ Documentation Updated

Implemented Features:

✔ Email OTP Verification
✔ WhatsApp OTP Verification
✔ OTP Security Before Registration
✔ JWT Authentication
✔ Password Encryption
✔ Automated Welcome Email
✔ WhatsApp Automation using whatsapp-web.js
✔ Food Menu Management
✔ Monthly Subscription Plans
✔ Payment Management
