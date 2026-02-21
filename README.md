# Toys API

This is a RESTful API for managing a collection of toys. Users can register, log in, and perform CRUD operations on toys. The API supports searching, filtering, and pagination for toys.

## Table of Contents
1.  [Features](#features)
2.  [Technologies Used](#technologies-used)
3.  [Setup Instructions](#setup-instructions)
4.  [API Endpoints](#api-endpoints)
    *   [Authentication (Users)](#authentication-users)
    *   [Toys Management](#toys-management)
5.  [Postman Collection (Optional)](#postman-collection-optional)

## Features
*   User Registration and Login with JWT authentication.
*   Secure password hashing using `bcrypt`.
*   Data validation using `Joi`.
*   CRUD operations for toys.
*   Pagination (10 items per page using `?skip=` as page number).
*   Searching by name or info.
*   Filtering by category.
*   Filtering by price range.
*   Protected routes requiring user authentication and ownership checks for toy modifications.

## Technologies Used
*   **Node.js**
*   **Express.js**
*   **MongoDB Atlas**
*   **Mongoose**
*   **bcrypt**
*   **jsonwebtoken**
*   **Joi**
*   **CORS**
*   **dotenv**

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nodejs-toys-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory and add the following environment variables:
    ```
    PORT=3001
    MONGO_URL=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secret_jwt_key_here
    ```
    *   `PORT`: The port on which the server will run.
    *   `MONGO_URL`: Your MongoDB Atlas connection string.
    *   `JWT_SECRET`: A strong secret key for signing JWTs. **Do not share this or expose it publicly.**

4.  **Start the server:**
    ```bash
    npm start
    ```

The server will start on the specified PORT (default 3001).

## API Endpoints

The base URL for the API is `http://localhost:3001`.

---

### Authentication (Users)

#### 1. Register a new user
*   **URL:** `/users`
*   **Method:** `POST`
*   **Description:** Creates a new user account.
*   **Request Body (JSON):**
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "securepassword123"
    }
    ```
    *   `name`: (string, required)
    *   `email`: (string, required, unique)
    *   `password`: (string, required, min 6 characters)
    *   `role` is NOT allowed in the request body. Default role is `"USER"`.

*   **Success Response (201 Created):**
    ```json
    {
        "message": "User registered successfully",
        "token": "eyJhbGciOiJIUzI1Ni...",
        "user": {
            "_id": "60d0fe4f5311236168a10000",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "USER"
        }
    }
    ```

*   **Error Responses:**
    *   `400 Bad Request`: Validation errors or email already exists.
    *   `500 Internal Server Error`

---

#### 2. User Login
*   **URL:** `/users/login`
*   **Method:** `POST`
*   **Description:** Authenticates a user and returns a JWT.
*   **Request Body (JSON):**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "securepassword123"
    }
    ```

*   **Success Response (200 OK):**
    ```json
    {
        "message": "Logged in successfully",
        "token": "eyJhbGciOiJIUzI1Ni..."
    }
    ```

Include the token in protected routes using:


x-api-key: YOUR_TOKEN


---

### Toys Management

Pagination rule:


?skip=1 → items 1–10
?skip=2 → items 11–20
?skip=3 → items 21–30


Each page contains 10 items.

All protected routes require an `x-api-key` header with a valid JWT.

---

#### 1. Get all toys
*   **URL:** `/toys?skip=1`
*   **Method:** `GET`
*   **Description:** Retrieves toys with pagination (10 per page).

---

#### 2. Search toys
*   **URL:** `/toys/search?s=robot&skip=1`
*   **Method:** `GET`
*   **Description:** Searches toys by `name` or `info`.

---

#### 3. Get toys by category
*   **URL:** `/toys/category/:catname?skip=1`
*   **Method:** `GET`

---

#### 4. Get toys by price range
*   **URL:** `/toys/prices?min=10&max=40&skip=1`
*   **Method:** `GET`

Example:

http://localhost:3001/toys/prices?min=10&max=40&skip=1


---

#### 5. Get a single toy by ID
*   **URL:** `/toys/single/:id`
*   **Method:** `GET`

---

#### 6. Get total count of toys
*   **URL:** `/toys/count`
*   **Method:** `GET`

---

#### 7. Add a new toy
*   **URL:** `/toys`
*   **Method:** `POST`
*   **Headers:** `x-api-key`
*   **Description:** Adds a new toy. `user_id` is assigned automatically from the authenticated user.

---

#### 8. Update a toy
*   **URL:** `/toys/:id`
*   **Method:** `PUT`
*   **Headers:** `x-api-key`
*   **Description:** User must be the owner of the toy.

---

#### 9. Delete a toy
*   **URL:** `/toys/:id`
*   **Method:** `DELETE`
*   **Headers:** `x-api-key`
*   **Description:** User must be the owner of the toy.

---

## Postman Collection (Optional)

You can test the API using Postman or Insomnia by creating requests based on the endpoints above.

---

**Note:** This project uses MongoDB Atlas. Make sure your `.env` variables are configured correctly before running the server.

## Create a .env file:

PORT=3001
MONGO_URL=mongodb+srv://fadibox16_db_user:aNWqNSRQudQvAHI1@toysclusternodejs.4zowjuc.mongodb.net/?appName=ToysClusterNodeJS
JWT_SECRET=supersecretjwtkey
