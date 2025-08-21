# MythicaVault Server (Backend)

Backend API for **MythicaVault** — an Express.js + MongoDB application that provides authentication, rate limiting, and CRUD for mythical creatures.

---

##  Features
-  **Authentication**: Signup, login, JWT + refresh tokens in secure HTTP-only cookies
-  **Protected Routes**: Access control with `verifyToken` and `isAuth` middlewares
-  **Creatures CRUD**: List, create, read, update, delete mythical creatures
-  **Validation & Error Handling**: `express-validator` & centralized error catching
-  **Security**: Helmet headers, rate-limiter, CORS  
-  **Modular Architecture**: Organized in controllers, routes, middleware, models

---

##  Tech Stack
| Layer | Technology |
|-------|------------|
| Server | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Security | JWT, Helmet, Rate Limiting, CORS |
| Code Quality | Modular controllers, validation, error handling |

---

##  Getting Started (Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/MontherALS/MythicaVaultServer.git backend
   cd backend
2. install dependencies with npm install

3. create .env file with
   ```bash
     PORT=5000
     DBURL=<your-mongodb-connection-string>
     JWT_SECRET=<strong-jwt-secret>
     REFRESH_TOKEN_SECRET=<strong-refresh-secret>
     CLIENT_URL=http://localhost:3000

4.run development mode with npm run dev

## If you have any suggestions or advice, feel free to open an issue or a pull request.
Contributions are always welcome!







