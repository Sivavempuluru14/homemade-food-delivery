# 🌐 Backend API Documentation

## Base URL

```http
http://localhost:5000
```

---

# 🔐 Authentication APIs

Authentication module handles:

* User Registration
* Email OTP Verification
* WhatsApp OTP Verification
* User Login
* Admin Login
* JWT Authentication
* User Profile Access
* Role Based Authentication (Admin/User)

---

# Authentication Flow

```text
User enters Full Name, Email, Mobile, Password and Location

                ↓

        Send OTP API

                ↓

 Email OTP Sent Successfully
                +
 WhatsApp OTP Sent Successfully

                ↓

      Verify OTP API

                ↓

Email Verified
+
WhatsApp Verified

                ↓

      Register User API

                ↓

Password Encrypted using bcrypt

                ↓

User Saved in MongoDB

                ↓

Welcome Email Sent

                ↓

Welcome WhatsApp Message Sent

                ↓

User Login / Admin Login

                ↓

JWT Token Generated

                ↓

Role Stored Inside JWT

                ↓

Protected APIs Access
```

---

# User Roles

The application supports two different roles.

| Role | Description |
|--------|------------|
| user | Normal customer who can register, login, subscribe and make payments |
| admin | Administrator who manages menu items and views all transactions |

---

# JWT Payload

Every successful login generates a JWT Token.

Example Payload

```json
{
    "id":"USER_ID",
    "role":"admin"
}
```

or

```json
{
    "id":"USER_ID",
    "role":"user"
}
```

The role is later used by the backend middleware to authorize APIs.

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

This API generates two different OTPs.

- Email OTP → Sent using Nodemailer
- WhatsApp OTP → Sent using whatsapp-web.js

Both OTPs must be verified before registration.

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

## OTP Collection (MongoDB)

```json
{
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "emailOtp": "483921",
  "whatsappOtp": "716504",
  "verified": false,
  "expireAt": "2026-07-20T10:30:00.000Z"
}
```

---

## Error Response

```json
{
  "message": "Failed to Send OTP"
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

This API verifies both OTPs.

Registration will be allowed only if:

- Email OTP is correct
- WhatsApp OTP is correct

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

## Database After Verification

```json
{
  "email": "siva@gmail.com",
  "mobile": "9876543210",
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

### OTP Expired

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

Registers a new user after successful OTP verification.

Before creating the account, backend checks:

- Email OTP Verified
- WhatsApp OTP Verified

Password is encrypted using bcrypt before storing into MongoDB.

After successful registration:

- Welcome Email is sent
- Welcome WhatsApp Message is sent

New users are automatically assigned the role:

```text
role = user
```

---

## Request Body

```json
{
  "fullName": "Siva",
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "password": "Password@123",
  "location": "Guindy Railway Station"
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
    "location": "Guindy Railway Station",
    "role": "user",
    "emailVerified": true,
    "mobileVerified": true,
    "createdAt": "2026-07-20T07:00:00.000Z"
  }
}
```

---

## Error Responses

### User Already Exists

```json
{
  "message": "User already exists"
}
```

---

### OTP Not Verified

```json
{
  "message": "Please verify OTP first"
}
```

---

# 4. User Login API

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

Authenticates registered users.

After successful authentication:

- Password is verified using bcrypt.
- JWT Token is generated.
- User role (Admin/User) is included in JWT payload.

Only users having

```text
role = user
```

can login through this API.

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
    "location": "Guindy Railway Station",
    "role": "user",
    "emailVerified": true,
    "mobileVerified": true
  }
}
```

---

## JWT Payload

```json
{
  "id": "user_id",
  "role": "user"
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

### Invalid Password

```json
{
  "message": "Invalid Password"
}
```

---

# 5. Admin Login API (NEW)

## Method

```http
POST
```

## Endpoint

```http
/api/auth/admin/login
```

---

## Description

Authenticates only Admin users.

Before login, backend verifies:

- Email exists
- Password is correct
- User role is **admin**

If role is **user**, login will be denied.

---

## Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
```

---

## Success Response

```json
{
  "message": "Admin Login Successful",
  "token": "JWT_TOKEN",
  "user": {
    "_id": "admin_id",
    "fullName": "Administrator",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

---

## Error Responses

### Unauthorized

```json
{
  "message": "Access Denied. Admin Only."
}
```

### Invalid Password

```json
{
  "message": "Invalid Password"
}
```

---

# 6. Get User Profile API

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

## Description

Returns logged-in user details.

This API is protected using JWT Authentication middleware.

---

## Success Response

```json
{
  "_id": "user_id",
  "fullName": "Siva",
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "location": "Guindy Railway Station",
  "role": "admin",
  "emailVerified": true,
  "mobileVerified": true
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

## Invalid Token

```json
{
  "message": "Invalid Token"
}
```

---

# 🍽️ Food Menu APIs

Food Menu module handles:

* Adding food items
* Fetching available food items
* Updating food details
* Deleting food items
* Admin Authorization
* JWT Protected APIs

---

# Food Menu Authorization

Food Menu APIs are divided into two categories.

## Public APIs

- View Food Menu

## Admin APIs

- Add Food Item
- Update Food Item
- Delete Food Item

Only users having

```text
role = admin
```

can perform menu management operations.

---

# Authentication Required

Protected APIs require JWT Token.

Example:

```http
Authorization: Bearer JWT_TOKEN
```

JWT token is verified using:

- protect Middleware

After successful authentication,

Admin Middleware checks:

```javascript
req.user.role === "admin"
```

If role is not admin,

Response:

```json
{
  "message": "Access Denied. Admin Only."
}
```

---

# Food Menu Access Control

| API | User | Admin |
|------|------|--------|
| View Menu | ✅ | ✅ |
| Add Menu | ❌ | ✅ |
| Update Menu | ❌ | ✅ |
| Delete Menu | ❌ | ✅ |

---

# Food Menu Request Flow

```text
Frontend

      ↓

Authorization Header

      ↓

protect Middleware

      ↓

JWT Verification

      ↓

Admin Middleware

      ↓

Role Validation

      ↓

Menu Controller

      ↓

MongoDB
```

---

# 1. Add Food Item API

## Method

```http
POST
```

## Endpoint

```http
/api/menu
```

---

## Description

Adds a new homemade food item into the database.

Only Admin users can access this API.

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Request Body

```json
{
  "foodName": "Veg Biryani",
  "category": "Lunch",
  "price": 180,
  "description": "Homemade Veg Biryani"
}
```

---

## Success Response

```json
{
  "message": "Food Item Added Successfully",
  "menu": {
    "_id": "food_id",
    "foodName": "Veg Biryani",
    "category": "Lunch",
    "price": 180,
    "description": "Homemade Veg Biryani",
    "createdAt": "2026-07-20T07:45:38.542Z",
    "updatedAt": "2026-07-20T07:45:38.542Z"
  }
}
```

---

## Unauthorized Response

```json
{
  "message": "Access Denied. Admin Only."
}
```

---

## Invalid Token

```json
{
  "message": "Invalid Token"
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

This API is public.

No JWT token is required.

Both Admin and User can access this API.

---

## Success Response

```json
[
  {
    "_id": "food_id",
    "foodName": "Veg Biryani",
    "category": "Lunch",
    "price": 180,
    "description": "Homemade Veg Biryani"
  },
  {
    "_id": "food_id",
    "foodName": "Idli",
    "category": "Breakfast",
    "price": 40,
    "description": "Soft Idli with Chutney"
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

## Description

Updates an existing food item.

Only Admin users can update menu details.

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Request Body

```json
{
  "foodName": "Special Veg Biryani",
  "category": "Lunch",
  "price": 220,
  "description": "Special Homemade Veg Biryani"
}
```

---

## Success Response

```json
{
  "message": "Food Item Updated Successfully",
  "menu": {
    "_id": "food_id",
    "foodName": "Special Veg Biryani",
    "category": "Lunch",
    "price": 220,
    "description": "Special Homemade Veg Biryani"
  }
}
```

---

## Food Item Not Found

```json
{
  "message": "Food Item Not Found"
}
```

---

## Unauthorized Response

```json
{
  "message": "Access Denied. Admin Only."
}
```

---

## Invalid Token

```json
{
  "message": "Invalid Token"
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

## Description

Deletes an existing food item.

Only Admin users can delete menu items.

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Success Response

```json
{
  "message": "Food Item Deleted Successfully",
  "menu": {
    "_id": "food_id",
    "foodName": "Veg Biryani"
  }
}
```

---

## Food Item Not Found

```json
{
  "message": "Food Item Not Found"
}
```

---

## Unauthorized Response

```json
{
  "message": "Access Denied. Admin Only."
}
```

---

## Invalid Token

```json
{
  "message": "Invalid Token"
}
```

---

# Menu API Security

The Food Menu module uses two middleware functions.

---

## 1. protect Middleware

Responsibilities:

- Verify JWT Token
- Decode JWT Payload
- Fetch Logged-in User
- Store User Information inside

```javascript
req.user
```

---

## 2. admin Middleware

Responsibilities:

Checks logged-in user's role.

```javascript
if (req.user.role !== "admin") {
    return res.status(403).json({
        message: "Access Denied. Admin Only."
    });
}
```

Only Admin users are allowed to:

- Add Food Item
- Update Food Item
- Delete Food Item

Normal users can only:

- View Food Menu

---

# Menu Authorization Flow

```text
Admin Login

      ↓

JWT Generated

      ↓

Authorization Header

      ↓

protect Middleware

      ↓

JWT Verified

      ↓

admin Middleware

      ↓

Role Checked

      ↓

Menu Controller

      ↓

MongoDB Updated
```

---

# Menu Middleware Used

| Middleware | Purpose |
|------------|----------|
| protect | JWT Authentication |
| admin | Role Based Authorization |

---

# Menu Module Summary

| API | Authentication | Authorization |
|------|---------------|---------------|
| GET /api/menu | ❌ | Public |
| POST /api/menu | ✅ | Admin Only |
| PUT /api/menu/:id | ✅ | Admin Only |
| DELETE /api/menu/:id | ✅ | Admin Only |

---

# 📦 Subscription APIs

Subscription module manages:

* Monthly Meal Plans
* Veg Subscription
* Non-Veg Subscription
* Lunch Box Setup Charges
* Payment Status
* User Subscription Details

---

# Subscription Plans

The application provides two monthly subscription plans.

## Veg Plan

```text
Monthly Charge : ₹6500

Lunch Box Charge : ₹1000

Total Amount : ₹7500
```

---

## Non-Veg Plan

```text
Monthly Charge : ₹7500

Lunch Box Charge : ₹1000

Total Amount : ₹8500
```

---

# Subscription Flow

```text
User Login

        ↓

Choose Subscription Plan

        ↓

Veg / Non-Veg

        ↓

Calculate Total Amount

        ↓

Create Subscription

        ↓

Payment Pending

        ↓

Proceed to Payment
```

---

# 1. Create Subscription API

## Method

```http
POST
```

## Endpoint

```http
/ api/subscriptions
```

---

## Description

Creates a monthly food subscription for the logged-in user.

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

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
  "message": "Subscription Created Successfully",
  "subscription": {
    "_id": "subscription_id",
    "userId": "user_id",
    "planType": "Veg",
    "amount": 6500,
    "lunchBoxCharge": 1000,
    "totalAmount": 7500,
    "paymentStatus": "Pending"
  }
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

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Success Response

```json
[
  {
    "_id":"subscription_id",
    "planType":"Veg",
    "paymentStatus":"Pending"
  }
]
```

---

# 💳 Payment APIs

Payment module handles:

* Payment Creation
* User Payment History
* Admin Payment History
* Payment Details
* Payment Status
* Role Based Authorization

---

# Payment Authorization

Payment APIs are divided into two categories.

## User APIs

- Create Payment
- View Own Payment History
- View Own Transaction

---

## Admin APIs

- View All Transactions
- View Any Transaction

---

# Payment Flow

```text
User Login

        ↓

Choose Subscription

        ↓

Create Subscription

        ↓

Proceed Payment

        ↓

Payment Successful

        ↓

Transaction Stored

        ↓

User → Own History

Admin → All Transactions
```

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

Creates payment after successful subscription.

Automatically generates

```text
Transaction ID
```

Example

```text
TXN1753123456789
```

Subscription payment status becomes

```text
Success
```

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Request Body

```json
{
  "userId":"user_id",
  "subscriptionId":"subscription_id",
  "amount":7500
}
```

---

## Success Response

```json
{
  "message":"Payment Successful",
  "payment":{
      "_id":"payment_id",
      "transactionId":"TXN1753123456789",
      "amount":7500,
      "paymentStatus":"Success"
  }
}
```

---

# 2. User Payment History API

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

Returns only the logged-in user's transactions.

Users cannot view other users' payment history.

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Success Response

```json
{
  "payments":[
    {
      "_id":"payment_id",
      "transactionId":"TXN1753123456789",
      "amount":7500,
      "paymentStatus":"Success"
    }
  ]
}
```

---

## Authorization

Backend automatically filters

```javascript
Payment.find({
    userId:req.user.id
})
```

Therefore,

```
User A

↓

Only User A Transactions
```

```
User B

↓

Only User B Transactions
```

---

# 3. Admin Payment History API (NEW)

## Method

```http
GET
```

## Endpoint

```http
/api/payment/admin/history
```

---

## Description

Returns every payment stored inside MongoDB.

Only Admin users can access this API.

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Success Response

```json
{
  "payments":[
    {
      "transactionId":"TXN1001",
      "userId":"USER1"
    },
    {
      "transactionId":"TXN1002",
      "userId":"USER2"
    },
    {
      "transactionId":"TXN1003",
      "userId":"USER3"
    }
  ]
}
```

---

## Unauthorized

```json
{
   "message":"Access Denied. Admin Only."
}
```

---

# 4. Get Payment By ID API

## Method

```http
GET
```

## Endpoint

```http
/api/payment/:id
```

---

## Description

Returns payment details.

Authorization Rules

### User

Can view

```
Own Transaction Only
```

---

### Admin

Can view

```
Any Transaction
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
    "_id":"payment_id",
    "transactionId":"TXN1753123456789",
    "amount":7500,
    "paymentStatus":"Success"
}
```

---

## Unauthorized Response

```json
{
   "message":"Access Denied"
}
```

---

## Payment Not Found

```json
{
   "message":"Payment not found"
}
```

---

# Payment Database Example

```json
{
    "_id":"payment_id",
    "userId":"user_id",
    "transactionId":"TXN1753123456789",
    "amount":7500,
    "paymentStatus":"Success",
    "paymentDate":"2026-07-20T10:00:00.000Z"
}
```

---

# Payment Access Control

| API | User | Admin |
|------|------|--------|
| POST /api/payment | ✅ | ✅ |
| GET /api/payment/history | Own Only | All (if using Admin API) |
| GET /api/payment/admin/history | ❌ | ✅ |
| GET /api/payment/:id | Own Only | Any Transaction |

---

# Payment Security Flow

```text
JWT Token

      ↓

protect Middleware

      ↓

Logged-in User

      ↓

Check Role

      ↓

Admin ?

      ↓

YES --------------------> View All Transactions

NO

↓

Check Owner

↓

Own Transaction ?

↓

YES

↓

Return Transaction

↓

NO

↓

Access Denied
```

---

# Subscription & Payment Relationship

```text
User Registration

        ↓

Choose Subscription

        ↓

Subscription Created

        ↓

Payment Successful

        ↓

Transaction Saved

        ↓

Subscription Status Updated

        ↓

Payment History Updated
```

---

# 💳 Payment APIs

Payment module handles:

* Payment Creation
* Payment History
* Payment Details
* Payment Status
* **User Transaction History**
* **Admin Transaction Management**
* **Role Based Transaction Access**

---

# Payment Authorization

Payment APIs are now divided into two categories.

## 👤 User APIs

* Create Payment
* View Own Payment History
* View Own Payment Details

A normal user can only access **their own transactions**.

---

## 👨‍💼 Admin APIs

* View All Transactions
* View Any Payment Details

Only users having

```text
role = admin
```

can access all transaction records.

---

# Payment Flow

```text
User Login

        ↓

JWT Token Generated

        ↓

Choose Subscription

        ↓

Proceed Payment

        ↓

Payment Successful

        ↓

Transaction Stored

        ↓

User can View Own History

        ↓

Admin can View All Transactions
```

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

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Description

Stores payment transaction after successful payment.

Transaction automatically belongs to the logged-in user.

---

## Request Body

```json
{
  "subscriptionId": "subscription_id",
  "amount": 7500
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
    "transactionId": "TXN1721484953",
    "amount": 7500,
    "paymentMethod": "UPI",
    "paymentStatus": "Success"
  }
}
```

---

# 2. User Payment History API

## Method

```http
GET
```

## Endpoint

```http
/api/payment/history
```

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Description

Returns only the logged-in user's transactions.

Backend automatically filters:

```javascript
userId = req.user._id
```

---

## Success Response

```json
{
  "payments": [
    {
      "_id": "payment_id",
      "transactionId": "TXN1721484953",
      "amount": 7500,
      "paymentMethod": "UPI",
      "paymentStatus": "Success",
      "paymentDate": "2026-07-20T10:30:00.000Z"
    }
  ]
}
```

---

# 3. Admin - All Transactions API

## Method

```http
GET
```

## Endpoint

```http
/api/payment/all
```

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Description

Returns every transaction stored in MongoDB.

Only Admin can access this API.

---

## Success Response

```json
{
  "payments": [
    {
      "userId": "user1",
      "transactionId": "TXN111",
      "amount": 7500
    },
    {
      "userId": "user2",
      "transactionId": "TXN222",
      "amount": 8500
    }
  ]
}
```

---

## Unauthorized Response

```json
{
  "message": "Access Denied. Admin Only."
}
```

---

# 4. Get Payment By ID API

## Method

```http
GET
```

## Endpoint

```http
/api/payment/:id
```

---

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Description

Returns payment details.

### User

Can view only their own payment.

### Admin

Can view any payment.

---

## Success Response

```json
{
  "_id": "payment_id",
  "transactionId": "TXN1721484953",
  "amount": 7500,
  "paymentMethod": "UPI",
  "paymentStatus": "Success",
  "paymentDate": "2026-07-20T10:00:00.000Z"
}
```

---

## Unauthorized Response

```json
{
  "message": "Access Denied"
}
```

---

# 🔐 Payment Security

The Payment module now uses JWT Authentication and Role-Based Authorization.

---

## User Access

Allowed:

* Create Payment
* View Own Payments
* View Own Transaction Details

---

## Admin Access

Allowed:

* View All Transactions
* View Any User Transaction

---

# Payment Database Example

```json
{
  "_id": "payment_id",
  "userId": "68761abcd123",
  "transactionId": "TXN1721484953",
  "amount": 7500,
  "paymentMethod": "UPI",
  "paymentStatus": "Success",
  "paymentDate": "2026-07-20T10:30:00.000Z",
  "createdAt": "2026-07-20T10:30:00.000Z",
  "updatedAt": "2026-07-20T10:30:00.000Z"
}
```

---

# Subscription & Payment Relationship

```text
User Login

        ↓

Select Monthly Plan

        ↓

Create Subscription

        ↓

Payment Successful

        ↓

Payment Saved

        ↓

Subscription Updated

        ↓

User Dashboard Shows Own Transactions

        ↓

Admin Dashboard Shows All Transactions
```

---

# ⚙️ Environment Variables (.env)

Create a `.env` file inside the **Backend** folder.

---

## Environment Configuration

```env
PORT=5000

# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<CLUSTER_NAME>.mongodb.net/HomemadeFoodDB?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=your_secret_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

## Example .env

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/HomemadeFoodDB?retryWrites=true&w=majority

JWT_SECRET=homemadefoodsecret

EMAIL_USER=example@gmail.com
EMAIL_PASS=xxxxxxxxxxxxxxxx
```

---

# 📧 Email Automation

Features:

* Email OTP
* Welcome Email
* Registration Success Email

---

# 💬 WhatsApp Automation

Project uses:

* whatsapp-web.js
* LocalAuth
* QR Authentication
* WhatsApp Session Storage

---

# Notification Flow

```text
Generate OTP

      ↓

Email OTP
      +

WhatsApp OTP

      ↓

Verify OTP

      ↓

Registration

      ↓

Welcome Email

      ↓

Welcome WhatsApp Message
```

---

# 🔒 Security Features

The application implements multiple security layers to protect user accounts, payment information, and admin functionalities.

---

## 1. Password Encryption

Passwords are encrypted before storing them in MongoDB.

Technology Used:

* bcrypt

Example:

Original Password

```text
Password@123
```

Stored Password

```text
$2b$10$xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 2. Email OTP Verification

Before registration,

Email OTP verification is mandatory.

Flow

```text
Email

↓

Generate OTP

↓

Send Email OTP

↓

Verify Email OTP

↓

Registration Allowed
```

---

## 3. WhatsApp OTP Verification

Mobile number verification is completed using WhatsApp OTP.

Flow

```text
Mobile Number

↓

Generate OTP

↓

Send WhatsApp OTP

↓

Verify WhatsApp OTP

↓

Registration Allowed
```

---

## 4. JWT Authentication

JWT protects private APIs.

Protected APIs require

```http
Authorization: Bearer JWT_TOKEN
```

JWT Payload

```json
{
    "id":"user_id",
    "role":"admin"
}
```

---

## 5. Role Based Authorization

The application supports two user roles.

### User

Permissions

* Register
* Login
* View Menu
* Create Subscription
* Make Payment
* View Own Payment History
* View Own Transaction Details

---

### Admin

Permissions

* Login
* Add Food Item
* Update Food Item
* Delete Food Item
* View All Food Items
* View All User Transactions
* View Any Payment Details
* Manage Menu

---

## Admin Middleware

Admin APIs use

```text
adminMiddleware.js
```

Validation

```javascript
req.user.role === "admin"
```

If role is not admin

```json
{
    "message":"Access Denied. Admin Only."
}
```

---

## 6. Payment Security

Payment module is protected using JWT Authentication.

Backend automatically identifies the logged-in user.

Example

```javascript
const userId = req.user._id;
```

This ensures

* Users can view only their own payment history.
* Users cannot access another user's transactions.
* Admin can access every transaction.

---

## 7. Protected APIs

The following APIs require JWT Authentication.

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /api/auth/profile    |
| POST   | /api/menu            |
| PUT    | /api/menu/:id        |
| DELETE | /api/menu/:id        |
| POST   | /api/subscriptions   |
| GET    | /api/subscriptions   |
| POST   | /api/payment         |
| GET    | /api/payment/history |
| GET    | /api/payment/all     |
| GET    | /api/payment/:id     |

---

## 8. Environment Security

Sensitive credentials are stored inside

```text
.env
```

Never upload

```text
.env
```

to GitHub.

Always include

```text
.env
```

inside

```text
.gitignore
```

---

# 🔄 Complete Application Flow

```text
User Opens Website

        ↓

Registration Page

        ↓

Enter User Details

        ↓

Generate Email OTP
        +
Generate WhatsApp OTP

        ↓

Verify Both OTPs

        ↓

Registration Successful

        ↓

Welcome Email
        +
Welcome WhatsApp Message

        ↓

Login

        ↓

JWT Token Generated

        ↓

Role Verified

        ↓

User Dashboard
        +
Admin Dashboard

        ↓

View Menu

        ↓

Choose Subscription

        ↓

Veg / Non-Veg

        ↓

Subscription Created

        ↓

Payment Successful

        ↓

Transaction Stored

        ↓

User Can View Own Transactions

        ↓

Admin Can View All Transactions
```

---

# 📋 Complete API Summary

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | /api/auth/send-otp   | Send Email OTP & WhatsApp OTP      |
| POST   | /api/auth/verify-otp | Verify Email & WhatsApp OTP        |
| POST   | /api/auth/register   | Register New User                  |
| POST   | /api/auth/login      | Login User/Admin                   |
| GET    | /api/auth/profile    | Get Logged-in User Profile         |
| POST   | /api/menu            | Add Food Item (Admin Only)         |
| GET    | /api/menu            | Get All Food Items                 |
| PUT    | /api/menu/:id        | Update Food Item (Admin Only)      |
| DELETE | /api/menu/:id        | Delete Food Item (Admin Only)      |
| POST   | /api/subscriptions   | Create Subscription                |
| GET    | /api/subscriptions   | Get All Subscriptions              |
| POST   | /api/payment         | Create Payment                     |
| GET    | /api/payment/history | Get Logged-in User Payment History |
| GET    | /api/payment/all     | Get All Transactions (Admin Only)  |
| GET    | /api/payment/:id     | Get Payment Details                |

---

# 📌 Latest Backend Updates

The following enhancements were added to the project after the initial implementation.

### Authentication Updates

* Added Role-Based Login (User/Admin)
* JWT now stores both User ID and Role
* Protected Profile API
* OTP verification required before registration

---

### Menu Module Updates

* Add Menu restricted to Admin
* Update Menu restricted to Admin
* Delete Menu restricted to Admin
* Public users can only view menu

---

### Payment Module Updates

* Payment automatically linked with Logged-in User
* Users can view only their own transaction history
* Admin can view all payment transactions
* Transaction ID generated automatically
* Subscription status updated after successful payment

---

### Notification Updates

* Email OTP using Nodemailer
* WhatsApp OTP using whatsapp-web.js
* Welcome Email after registration
* Welcome WhatsApp message after registration

---

### Security Improvements

* Password Encryption using bcrypt
* JWT Authentication
* Role-Based Authorization
* Protected APIs
* Admin Middleware
* User-specific Payment Access
* MongoDB Atlas Integration
* Environment Variables Protection

---

# 🛠 Technology Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* JWT
* bcrypt

## Notifications

* Nodemailer
* whatsapp-web.js
* qrcode-terminal

## API Testing

* Postman

## Version Control

* Git
* GitHub

---

# ✅ Project Status

The backend now supports:

* User Registration with Email & WhatsApp OTP
* Secure Login with JWT
* Role-Based Authentication (User/Admin)
* Protected APIs
* Admin Menu Management
* Monthly Subscription System
* Payment Management
* User-Specific Transaction History
* Admin Transaction Dashboard
* Email Notifications
* WhatsApp Notifications
* MongoDB Atlas Database Integration

---

