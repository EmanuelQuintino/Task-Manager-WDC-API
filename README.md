# Task-Manager-API

## Entity Relationship Diagram

![ERD](./erd.png)

**Description:**

The Task Manager is a full-stack web application developed as a final project for the Reprograma Jucás Web Development course. This application allows users to organize their tasks efficiently, offering advanced management and collaboration features.

## Technologies

- `Node.js`
- `Typescript`
- `Express`
- `JSON Web Token (JWT)`
- `Bcrypt`
- `Sqlite`
- `Zod`

## Installation

```bash
# clone project
$ git clone https://github.com/EmanuelQuintino/Task-Manager-API.git

# install dependencies
$ npm install

# run api
$ npm run dev
```

## Environment Variables

```ini
PORT=""
SECRET_TOKEN=""
EXPIRESIN_TOKEN=""
KEY_TOKEN=""
```

## Endpoints

### Authentication

- `POST: ("/login")`: Starts the user session.
- `POST: ("/logout")`: Closes the user session.

### User

- `GET: ("/user")`: Returns user information.
- `POST: ("/user")`: Creates a new user.

### Tasks

- `POST: ("/task")`: Adds a new task.
- `GET: ("/tasks")`: Returns all tasks.
- `PUT: ("/task/:id")`: Updates an existing task.
- `DELETE: ("/task/:id")`: Removes an existing task.

## Pagination

- Parameters:
- `limit`: Number of items per page.
- `offset`: Offset index.
- `filter`: Filter options: all | completed | "pending" | "afternoon".

**Example of Pagination Usage**: `/tasks?limit=4&offset=0&filter=late`

## Links

- [Deploy](https://task-manager-seven-indol.vercel.app/)
- [Client-Side Repository](https://github.com/EmanuelQuintino/Task-Manager)
