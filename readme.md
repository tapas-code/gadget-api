# 🚀 Gadget API

A secure and efficient REST API for managing gadgets, featuring authentication, caching, self-destruct codes, and filtering. Built with **Node.js, Express, PostgreSQL, Prisma, Redis, and JWT authentication**.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **Caching & Messaging:** Redis
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Render


## 📌 Features

- ✅ **JWT Authentication** (Signup, Login, OTP verification)
- ✅ **CRUD Operations** for gadgets
- ✅ **Self-destruct confirmation codes** (via Redis)
- ✅ **Status-based gadget filtering** (GET /gadgets?status={status})
- ✅ **Random mission success probability** for each gadget
- ✅ **Deployment on Render**

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/tapas-code/gadget-api.git
cd gadget-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DATABASE_URL="your_postgres_connection_url"
JWT_SECRET="your_jwt_secret"
REDIS_URL="your_redis_connection_url"
```

### 4️⃣ Run Migrations (Prisma)
```sh
npx prisma migrate dev 
```

### 5️⃣ Start the Server
```sh
npm run dev
```

---

## 📌 API Endpoints

### **Authentication**
#### 🔹 Register
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
    "message": "User registered successfully"
}
```

#### 🔹 Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "jwt_token_here"
}
```

### **Gadgets Management**
#### 🔹 Fetch all gadgets
```http
GET /api/gadgets
```
**Response:**
```json
[
    {
        "id": "6b45ac0d-6ac3-4b73-b5ed-a414ba190195",
        "name": "The Nightingale",
        "status": "Available",
        "createdAt": "2025-01-30T08:46:21.874Z",
        "updatedAt": "2025-01-30T08:46:21.874Z",
        "decommissionedAt": null,
        "missionSuccessProbability": "92%"
    },
    {
        "id": "6646f657-be9d-47e0-b0c1-20f4dc0c8a99",
        "name": "The Kraken",
        "status": "Destroyed",
        "createdAt": "2025-01-30T08:46:05.462Z",
        "updatedAt": "2025-01-30T08:49:10.117Z",
        "decommissionedAt": null,
        "missionSuccessProbability": "78%"
    },
    {
        "id": "4883191c-ba78-44c4-9766-6cefaffda9a0",
        "name": "The Necron Lance",
        "status": "Decommissioned",
        "createdAt": "2025-01-30T08:51:26.106Z",
        "updatedAt": "2025-01-30T08:55:50.621Z",
        "decommissionedAt": "2025-01-30T08:55:50.618Z",
        "missionSuccessProbability": "54%"
    },
]
```

#### 🔹 Get gadgets by status
```http
GET /api/gadgets?status=Decommissioned
```
**Response:**
```json
[
    {
        "id": "4883191c-ba78-44c4-9766-6cefaffda9a0",
        "name": "The Necron Lance",
        "status": "Decommissioned",
        "createdAt": "2025-01-30T08:51:26.106Z",
        "updatedAt": "2025-01-30T08:55:50.621Z",
        "decommissionedAt": "2025-01-30T08:55:50.618Z",
        "missionSuccessProbability": "59%"
    }
]
```

#### 🔹 Create a new gadget
```http
POST /api/gadgets
```
**Request Body:**
```json
{
  "name": "The Kraken"
}
```

#### 🔹 Update a gadget
```http
PATCH /api/gadgets/:id
```
**Request Body:**
```json
{
  "name": "Updated Name",
  "status": "Deployed"
}
```

#### 🔹 Delete (decommission) a gadget
```http
DELETE /api/gadgets/:id
```

### **Self-Destruct Feature**
#### 🔹 Request a self-destruct confirmation code
```http
POST /api/gadgets/:id/self-destruct/request
```
**Response:**
```json
{
  "message": "Self-destruct confirmation code generated.",
  "confirmationCode": 123456,
  "expiresIn": 300
}
```

#### 🔹 Confirm self-destruct
```http
POST /api/gadgets/:id/self-destruct/confirm
```
**Request Body:**
```json
{
  "confirmationCode": 123456
}
```

---

## 🚀 Deployment on Render

1. **Push to GitHub**
```sh
git add .
git commit -m "Initial commit"
git push origin main
```
2. **Deploy on Render** (Follow Render setup instructions)
3. **Set up Environment Variables** on Render
4. **Start Deployment**

---

## 🔗 Environment Variables
| Variable       | Description |
|---------------|-------------|
| `PORT`        | Port number for the server |
| `DATABASE_URL` | PostgreSQL connection URL |
| `JWT_SECRET`  | Secret key for JWT authentication |
| `REDIS_URL`   | Redis connection URL |

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Author
Developed by **Tapas Tanty** 🚀

🔗 **GitHub:** [tapas-code](https://github.com/tapas-code)  
📧 **Email:** tapas.code247@gmail.com 

---

### ⭐ Don't forget to star the repo if you found it useful!

