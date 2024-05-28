# PERN Todo List

A full-stack Todo List application built using the PERN stack (PostgreSQL, Express, React, Node.js). This project demonstrates a simple implementation of CRUD (Create, Read, Update, Delete) operations with a modern web development stack.

## Table of Contents

- [PERN Todo List](#pern-todo-list)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)
    - [Deploying the Client to Vercel](#deploying-the-client-to-vercel)
    - [Deploying the Server to Heroku](#deploying-the-server-to-heroku)
  - [Environment Variables](#environment-variables)
  - [License](#license)
  - [Contact](#contact)

## Demo

[Live Demo](https://your-vercel-app.vercel.app)

## Features

- Add new todos
- View a list of todos
- Edit existing todos
- Delete todos
- Pagination for viewing todos

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Deployment**: Vercel (frontend), Heroku (backend)

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- PostgreSQL

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/maesterfox/PERN-Todo.git
   cd PERN-Todo
   ```

2. **Setup the backend**:

   ```bash
   cd server
   npm install
   ```

3. **Setup the frontend**:

   ```bash
   cd ../client
   npm install
   ```

4. **Setup the PostgreSQL database**:

   - Create a PostgreSQL database named `perntodo`.
   - Run the SQL script located in `server/database.sql` to create the necessary tables.

   ```bash
   psql -U your_postgres_user -d perntodo -f server/database.sql
   ```

5. **Configure environment variables**:

   - Create a `.env` file in the `server` directory and add your PostgreSQL credentials.

   ```env
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   DB_DATABASE=perntodo
   ```

## Usage

1. **Start the backend server**:

   ```bash
   cd server
   npm start
   ```

   The backend server will start on `http://localhost:5000`.

2. **Start the frontend development server**:

   ```bash
   cd ../client
   npm start
   ```

   The frontend server will start on `http://localhost:3000`.

## Deployment

### Deploying the Client to Vercel

1. **Setup Vercel Project**:

   - Create a new project on Vercel and link it to your GitHub repository.

2. **Configure `vercel.json`**:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "client/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "client/build"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/client/$1"
       }
     ]
   }
   ```

3. **Deploy to Vercel**:

   - Push your changes to GitHub.
   - Vercel will automatically deploy the client.

### Deploying the Server to Heroku

1. **Create a Heroku Project**:

   - Create a new project on Heroku.

2. **Add PostgreSQL Addon**:

   - Add the Heroku Postgres addon to your project.

3. **Configure Environment Variables**:

   - Set your PostgreSQL environment variables in the Heroku dashboard.

4. **Procfile**:

   - Create a `Procfile` in the `server` directory:

   ```Procfile
   web: node index.js
   ```

5. **Deploy to Heroku**:

   ```bash
   cd server
   git init
   heroku git:remote -a your-heroku-app-name
   git add .
   git commit -m "Deploy server"
   git push heroku master
   ```

## Environment Variables

The following environment variables are required:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_DATABASE=perntodo
```

## License

This project is licensed under the MIT License.

## Contact

David Fox - [your-email@example.com](mailto:your-email@example.com)

GitHub: [maesterfox](https://github.com/maesterfox)

