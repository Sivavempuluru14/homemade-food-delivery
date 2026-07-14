# 🌐 Backend API Documentation

## Base URL

```http
http://localhost:5000
```

---

# 🔐 Authentication APIs

## 1. Register User

### Method
```http
POST
```

### Endpoint
```http
/api/auth/register
```

### Request Body

```json
{
  "fullName": "Siva",
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "password": "Password@123",
  "location": "Guindy"
}
```

### Success Response

```json
{
  "message": "Registration Successful",
  "user": {
    "_id": "user_id",
    "fullName": "Siva",
    "email": "siva@gmail.com",
    "mobile": "9876543210",
    "location": "Guindy"
  }
}
```

### Error Response

```json
{
  "message": "User already exists"
}
```

---

## 2. Login User

### Method
```http
POST
```

### Endpoint
```http
/api/auth/login
```

### Request Body

```json
{
  "email": "siva@gmail.com",
  "password": "Password@123"
}
```

### Success Response

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

### Error Response

```json
{
  "message": "User not found"
}
```

```json
{
  "message": "Invalid Password"
}
```

---

## 3. Get User Profile

### Method
```http
GET
```

### Endpoint
```http
/api/auth/profile
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Success Response

```json
{
  "_id": "user_id",
  "fullName": "Siva",
  "email": "siva@gmail.com",
  "mobile": "9876543210",
  "location": "Guindy"
}
```

### Error Response

```json
{
  "message": "No Token, Authorization Denied"
}
```

---

# 🍽️ Food Menu APIs

## 1. Add Food Item

### Method
```http
POST
```

### Endpoint
```http
/api/menu
```

### Request Body

```json
{
  "foodName": "Idli",
  "category": "Breakfast",
  "price": 40,
  "description": "Soft Idli with Chutney",
  "image": "idli.jpg"
}
```

### Success Response

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

## 2. Get All Food Items

### Method
```http
GET
```

### Endpoint
```http
/api/menu
```

### Success Response

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

## 3. Update Food Item

### Method
```http
PUT
```

### Endpoint
```http
/api/menu/:id
```

### Example

```http
/api/menu/food_id
```

### Request Body

```json
{
  "foodName": "Masala Idli",
  "category": "Breakfast",
  "price": 60,
  "description": "Hot Masala Idli",
  "image": "masala-idli.jpg"
}
```

### Success Response

```json
{
  "message": "Food Item Updated Successfully"
}
```

---

## 4. Delete Food Item

### Method
```http
DELETE
```

### Endpoint
```http
/api/menu/:id
```

### Example

```http
/api/menu/food_id
```

### Success Response

```json
{
  "message": "Food Item Deleted Successfully"
}
```

---

# 📦 Subscription APIs

## 1. Create Subscription

### Method
```http
POST
```

### Endpoint
```http
/api/subscriptions
```

### Veg Plan Request

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

### Non-Veg Plan Request

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

### Success Response

```json
{
  "message": "Subscription Created Successfully"
}
```

---

## 2. Get All Subscriptions

### Method
```http
GET
```

### Endpoint
```http
/api/subscriptions
```

### Success Response

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

## 1. Create Payment

### Method
```http
POST
```

### Endpoint
```http
/api/payment
```

### Request Body

```json
{
  "userId": "user_id",
  "transactionId": "TXN123456",
  "amount": 7500,
  "paymentMethod": "UPI",
  "paymentStatus": "Success"
}
```

### Success Response

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

### Error Response

```json
{
  "message": "Payment Failed"
}
```

---

## 2. Get Payment History

### Method
```http
GET
```

### Endpoint
```http
/api/payment/history
```

### Success Response

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

### Error Response

```json
{
  "message": "No Payment History Found"
}
```

---

## 3. Get Payment By ID

### Method
```http
GET
```

### Endpoint
```http
/api/payment/:id
```

### Example

```http
/api/payment/6874f123456789
```

### Success Response

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

### Error Response

```json
{
  "message": "Payment not found"
}
```

---

# 📋 API Summary

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | Get User Profile |
| POST | /api/menu | Add Food Item |
| GET | /api/menu | Get All Food Items |
| PUT | /api/menu/:id | Update Food Item |
| DELETE | /api/menu/:id | Delete Food Item |
| POST | /api/subscriptions | Create Subscription |
| GET | /api/subscriptions | Get All Subscriptions |
| POST | /api/payment | Create Payment |
| GET | /api/payment/history | Get Payment History |
| GET | /api/payment/:id | Get Payment By ID |