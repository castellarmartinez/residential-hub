# Residential Hub API

## Description
This API facilitates the management of residential communities. Each community is organized into associations, which group multiple units (apartments or houses). Users can be associated with one or more units as owners or residents. The platform also supports booking amenities, such as event halls or gyms, through an integrated booking system. The API adheres to **hexagonal architecture (Ports and Adapters)** principles and is built using **Node.js, TypeScript and MongoDB**.

## Main Features

- **Register users, units, associations, amenities and bookings** with information unique for every domain.
- **Query users, units, associations, amenities and bookings** with filters by associations.
- **Update users, units, associations, amenities and bookings** (Pending, Approved, Rejected).
- **Remove users, units, associations, amenities and bookings**, allowing the addition of new unique categories.

## Technologies Used

- **Backend:** Node.js with TypeScript  
- **Framework:** Express.js and Mongoose
- **Database:** MongoDB support  
- **Architecture:** Hexagonal (Ports and Adapters)

---

## Architecture Decisions

**Hexagonal architecture (Ports and Adapters)** was the preferred choice to develop this project. This architecture allows the decouple the bussiness logic from the different frameworks, databases and 
technologies. Also an integration with MongoDB and Postgres is desired and this architecture gives the opportunity through dependency injections to work with both databases at the same time without the need 
of updating the bussiness logic. In the following image we can see the main components of this architecture. We have the **domain, application and framework** layers. A typical request comes from 
**Input adapters** in the framework layer, that for this API is done with REST and Express.js framework through the controllers. From the controllers we go to the **Input Ports** in the application layer, these
ports contain the bussiness logic to manipulate the **Entities** in the domain layer. After that, through the **Output ports** the required data is store in the database and the final response is sent back through
the **Output adapters**. In the future we can switch from REST to GrahpQL or from MongoDB to DynamoDB without the need to change the bussiness logic.

![image](https://github.com/user-attachments/assets/73efed3d-66e9-4ba0-99b9-2d53d0d1bff2)

The database (MongoDB) contains four collections: **Users, Units, Associations, Amenities and Bookings**. Next are the relationships between these tables:

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
Create a `.env` file in the project root based on `.env.example`, an example is given:

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
Not respose

### 6. The same applies for the rest of resources:

**UNITS** `/units`

**ASSOCIATIONS** `/associations`

**AMENITIES** `/amenities`

**BOOKINGS** `/bookings`

There is middlewares in every route that give information about the required field in the json body to create/update these resources.

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

## Pending to immplement:

### PostgresSQL integragion
### User authentication
### Databases interoperation

## Author  
**David Castellar Martínez** [[GitHub](https://github.com/castellarmartinez/)]  
[[LinkedIn](https://www.linkedin.com/in/castellarmartinez/)]

