const request = require('supertest');
const app = require("../server"); 
const mongoose = require('mongoose');

describe('Server', () => {


  beforeAll(async () => {
    const uri = "mongodb+srv://noahsoliman:jP8HsddmICL57uEd@wh-soft.c2tfoj1.mongodb.net/Wh-soft-db";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });
  
  afterAll(async () => {
    // Disconnect from MongoDB after running the tests
    await mongoose.disconnect();
  });


  it('should start the server and connect to MongoDB', async () => {
    // Send a request to the server's root URL
    const response = await request(app).get('/');

    // Assert that the server responds with a status code of 200
    expect(response.status).toBe(200);

    // Assert that the response body contains the message indicating MongoDB connection
    expect(response.text).toContain('Welcome to server');
  });
});
