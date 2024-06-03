Warehouse Management Application

This application is designed to manage a warehouse inventory and facilitate product management.
Prerequisites

Before you begin, ensure you have met the following requirements:

    Node.js and npm installed on your local machine.
    Docker and Docker Compose installed on your local machine (optional, if you prefer to run the application using Docker).
    MongoDB Atlas account or MongoDB server running locally (if you're using a MongoDB database).

Installation
Step 1: Clone the Repository

Clone this repository to your local machine:

sh

git clone <repository-url>

Step 2: Create a .env File

Create a .env file in the backend/ directory with the following content. Update the MongoDB connection URI with your own MongoDB details:

Example .env file:

bash

MONGODB_URI=mongodb://localhost:27017/warehouse

# Or for MongoDB Atlas

MONGODB_URI=mongodb+srv://username:password@wh-soft.c2tfoj1.mongodb.net

Build and Run

You have two options to run the application: using Docker or manually installing dependencies.
Option 1: Using Docker Compose

    Build Docker Images for Both Backend and Frontend:

    sh

docker-compose build

Start the Docker Containers:

sh

docker-compose up

This will start both backend and frontend containers. You can access the application at http://localhost:3000.

Stop the Services:

sh

    docker-compose down

Option 2: Manually Installing Dependencies
Backend

    Install Backend Dependencies:

    sh

cd backend
npm install

Start the Backend Server:

sh

    npm start

    The backend server will start running on port 3001 by default.

Frontend

    Install Frontend Dependencies:

    sh

cd frontend
npm install

Start the Frontend Development Server:

sh

    npm start

    The frontend development server will start running on port 3000 by default and open in your default web browser.

Once both the backend and frontend servers are running, you can access the application by navigating to http://localhost:3000 in your web browser.
Data Files

Ensure that the data files you intend to upload are named products.json for products and inventory.json for articles. These JSON files must be structured in a specific way. Look in the root directory of your project in the folder simple-data, where you will find two files suitable for the project that you can upload from within the program interface.
Additional Notes

    Ensure MongoDB is running and accessible before starting the backend server.
    If you encounter any issues or have questions, feel free to contact us at Noah.soliman@outlook.com.
