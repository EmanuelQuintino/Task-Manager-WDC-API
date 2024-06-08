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

## Routes

| Functionality | Method   | Endpoint  | Description             |
| ------------- | -------- | --------- | ----------------------- |
| Auth          | `POST`   | /login    | Start the user session  |
|               | `POST`   | /logout   | Close the user session  |
| User          | `GET`    | /user     | Return user information |
|               | `POST`   | /user     | Create a new user       |
| Tasks         | `POST`   | /task     | Add a new task          |
|               | `GET`    | /tasks    | Return pagination tasks |
|               | `PUT`    | /task/:id | Update an existing task |
|               | `DELETE` | /task/:id | Remove an existing task |

## Pagination Parameters

- `limit:` Number of items per page.
- `offset:` Offset index.
- `filter:` Filter options `"all"`, `"completed"`, `"pending"`, `"late"`.
- Query example: `/tasks?limit=10&offset=0&filter=all`.

## Links

- [Deploy](https://task-manager-seven-indol.vercel.app/)
- [Client-Side Repository](https://github.com/EmanuelQuintino/Task-Manager)
