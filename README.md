# Residential Hub API

## Description
This API facilitates the management of residential communities. Each community is organized into associations, which group multiple units (apartments or houses). Users can be associated with one or more units as owners or residents. The platform also supports booking amenities, such as event halls or gyms, through an integrated booking system. The API adheres to **hexagonal architecture (Ports and Adapters)** principles and is built using **Node.js, TypeScript and MongoDB**.

## Main Features

- **Register users, units, associations, amenities and bookings** with unique information for each domain.
- **Query users, units, associations, amenities and bookings** with filtering by association.
- **Update users, units, associations, amenities and bookings** allowing to update the fields of these resources.
- **Remove users, units, associations, amenities and bookings**, allowing to remove these resources from the database.

## Technologies Used

- **Backend:** Node.js with TypeScript  
- **Framework:** Express.js and Mongoose
- **Database:** MongoDB support  
- **Architecture:** Hexagonal (Ports and Adapters)

---

## Architecture Decisions

The **Hexagonal architecture (Ports and Adapters)** was chosen for this project to decouple business logic from frameworks, databases, and external technologies. This design enables seamless integration with both MongoDB and PostgreSQL, leveraging dependency injection to support multiple databases without modifying the business logic. The architecture consists of three main layers:**Domain, Application and Framework** . 

A typical request flows as follows:

1. **Input Adapters**(Framework Layer): Handled via REST using Express.js controllers.
2. **Input Ports** (Application Layer): Contain the business logic to manipulate **Entities** in the Domain Layer.
3. **Output Ports**: Store data in the database and return responses via **Output Adapters**.

This structure allows future flexibility, such as switching from REST to GraphQL or from MongoDB to DynamoDB, without altering the core business logic.

![image](https://github.com/user-attachments/assets/73efed3d-66e9-4ba0-99b9-2d53d0d1bff2)

## Database Schema

The MongoDB database includes five collections: **Users, Units, Associations, Amenities and Bookings**. Relationships between these collections are as follows:

- A user can belong to multiple units, and a unit can have multiple users (e.g., residents or owners).
- A unit belongs to one association, and an association can group multiple units.
- A user can be linked to multiple associations, and an association can have multiple users.
- A user can reserve amenities (e.g., gyms, event rooms) through bookings.
- Bookings are made for a specific amenity in an association, by a user.

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/castellarmartinez/residential-hub
cd residential-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root based on `.env.example` template. Example:

```env
HOST=localhost
PORT=3000

DB_NAME=residential-hub
MONGO_URI=mongodb://localhost:27017/
POSTGRES_USER=user
POSTGRES_PASS=password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### 4. Build the app:

```bash
npm run build
```

---

### 5. Start the the app:
```bash
npm start
```


## Available Endpoints

### 1. Create a user

**POST** `/users`

```bash
curl -X POST http://localhost:3033/users -d '{"names": "David", "email": "david@castellar.com", "password": "mypass"}' -H "Content-Type: application/json" -i
```

**Response:**

```json
{
  "user": {
    "id": "5ebb99a4-4fa0-4aa3-a919-9fb576a0a054",
    "email":  "david@castellar.com",
    "password": "mypass",
    "names": "David"
  }
}
```

### 2. Get all users  
**GET** `/users`

```bash
curl -X GET http://localhost:3000/users -i
```

**Response:**

```json
{
  "users": [
    {
      "id": "e3b41036-95e8-45c0-9183-8c40ee764df2",
      "email": "david@castellar.com",
      "password": "mypass",
      "lastNames": "David R",
      "associations": [],
      "units": []
    },
    {
      "id": "b57ddb4a-f2e5-4f68-a4f6-09f409967ea0",
      "email": "david@castellar.com",
      "password": "mypass",
      "names": "David R",
      "associations": [
        {
          "_id": "c7a14317-f8cc-445c-b05c-f4ed000981a3",
          "name": "Conjunto Caminos",
          "address": "Manizales"
        },
        {
          "_id": "8e686eab-5330-4627-bfff-7d48cd5cdbac",
          "name": "Conjunto Estación",
          "address": "Cucuta"
        }
      ],
      "units": [
        {
          "_id": "2f6cdcdd-41ec-468a-8bdb-ac01ce191c20",
          "name": "Apartamento 1212"
        }
      ]
    },
  ]
}
```

### 3. Get all users filtered by associations
**GET** `/users?association={id}`

```bash
curl -X GET http://localhost:3000/users?association=8e686eab-5330-4627-bfff-7d48cd5cdbac -i
```

**Response:**

```json
{
  "users": [
    {
      "id": "b57ddb4a-f2e5-4f68-a4f6-09f409967ea0",
      "email": "david@castellar.com",
      "password": "mypass",
      "names": "David R",
      "associations": [
        {
          "_id": "c7a14317-f8cc-445c-b05c-f4ed000981a3",
          "name": "Conjunto Caminos",
          "address": "Manizales"
        },
        {
          "_id": "8e686eab-5330-4627-bfff-7d48cd5cdbac",
          "name": "Conjunto Estación",
          "address": "Cucuta"
        }
      ],
      "units": [
        {
          "_id": "2f6cdcdd-41ec-468a-8bdb-ac01ce191c20",
          "name": "Apartamento 1212"
        }
      ]
    },
  ]
}
```

### 3. Get user by id
**GET** `/users/{id}`

```bash
curl -X GET "http://localhost:3000/users/e3b41036-95e8-45c0-9183-8c40ee764df2" -H "Content-Type: application/json" -i
```

**Response:**

```json
{
  "user": {
    "id": "e3b41036-95e8-45c0-9183-8c40ee764df2",
    "email": "david@castellar.com",
    "password": "mypass",
    "names": "David Antonio",
    "lastNames": "David R",
    "associations": [],
    "units": []
  }
}
```

### 4. Update a user by id
**PATCH** `/users/{id}`

```bash
curl -X PATCH "http://localhost:3000/users/e3b41036-95e8-45c0-9183-8c40ee764df2" -d '{"names": "David Antonio"}' -H "Content-Type: application/json" -i
```

**Response:**

```json
{
  "user": {
    "id": "e3b41036-95e8-45c0-9183-8c40ee764df2",
    "email": "david@castellar.com",
    "password": "mypass",
    "names": "David Antonio",
    "lastNames": "David R",
    "associations": [],
    "units": []
  }
}
```

### 5. Delete a user by id
**PATCH** `/users/{id}`

```bash
curl -X DELETE "http://localhost:3000/users/e3b41036-95e8-45c0-9183-8c40ee764df2" -i
```

**Response:**

Returns HTTP 204 No Content (no response body).

### 6. Other Resources:

**Units** `/units`

**Associations** `/associations`

**Amenities** `/amenities`

**Bookings** `/bookings`

Middleware on each route provides details about required fields in the JSON body for creating or updating these resources.

## Technical Justification

### Language and Framework
**Node.js with TypeScript:**
- Excellent performance in I/O-intensive applications.
- Mature ecosystem for web development and microservices.
- Static typing with TypeScript improves maintainability.

### Database
**MongoDB support:**
- **MongoDB:** A flexible NoSQL database useful for dynamic storage and JSON-like documents. Very easy to configure from Node.js, which was the main reason for choosing it over relational databases. Even
- though there are relationships between entities (where a relational DB would be better), MongoDB allows working with those relationships sufficiently.

---

## Pending Implementation

### PostgresSQL Integration
### User Authentication
### Databases Interoperability (e.g., using both MongoDB and PostgreSQL simultaneously)

## Author  
**David Castellar Martínez** [[GitHub](https://github.com/castellarmartinez/)]  [[LinkedIn](https://www.linkedin.com/in/castellarmartinez/)]

