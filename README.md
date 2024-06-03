# Warehouse Management Application
This application is designed to manage a warehouse inventory and facilitate product management.
## Prerequisites
Before you begin, ensure you have met the following requirements:

• Node.js and npm installed on your local machine.

• Docker and Docker Compose installed on your local machine (optional, if you prefer to run the application using Docker).

• MongoDB Atlas account or MongoDB server running locally (if you're using a MongoDB database).

## Installation

### Step 1: Clone the Repository

Clone this repository to your local machine:

    git clone <repository-url>

### Step 2: Create a .env File

Create a .env file in the backend/ directory with the following content.

Update the MongoDB connection URI with your own MongoDB details:

Example .env file:

    MONGODB_URI=mongodb://localhost:27017/warehouse
    
Or for MongoDB Atlas

    MONGODB_URI=mongodb+srv://username:password@wh-soft.c2tfoj1.mongodb.net

    
## Build and Run

You have two options to run the application: using Docker or manually installing dependencies.

### Option 1: Using Docker Compose

1. Build Docker Images for Both Backend and Frontend:

        docker-compose build
   
2. Start the Docker Containers:

        docker-compose up
   
This will start both backend and frontend containers.

You can access the application at http://localhost:3000.

### Option 2: Manually Installing Dependencies

#### Backend
1.	Install Backend Dependencies:

        cd backend
  	
        npm install
  	
2.  Start the Backend Server:
  
        npm start
   
The backend server will start running on port 3001 by default.

#### Frontend

1. Install Frontend Dependencies:

        cd frontend

        npm install
        
2. Start the Frontend Development Server:

        npm start
   
The frontend development server will start running on port 3000 by default and open in your default web browser.

Once both the backend and frontend servers are running, you can access the application by navigating to http://localhost:3000 in your web browser.

### Data Files

Ensure that the data files you intend to upload are named products.json for products and inventory.json for articles. These JSON files must be structured in a specific way. Look in the root directory of your project in the folder simple-data, where you will find two files suitable for the project that you can upload from within the program interface.


## Running Unit Tests

You can run some unit test cases for both the backend and frontend components of the application.

### Backend

To run backend unit tests, navigate to the `backend/` directory and run the following command:

    cd backend
    
    npm test

This will execute some unit test cases for the frontend codebase.

### frontend
To run frontend unit tests, navigate to the frontend/ directory and run the following command:

    cd frontend
    
    npm test


This will execute some unit test cases for the frontend codebase.

Make sure you have installed all dependencies before running the tests.

### Additional Notes

•	Ensure MongoDB is running and accessible before starting the backend server.

•	If you encounter any issues or have questions, feel free to contact us at Noah.soliman@outlook.com.


