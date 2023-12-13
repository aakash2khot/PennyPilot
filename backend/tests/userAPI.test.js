const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const User = require('../models/userModel')
// const api = supertest(app)
const helper = require('./helperTest')

const request = supertest(app);

beforeEach(async () => {
	// Increasing timeout otherwise sometimes a timeout error can wreck the whole testing phase
    jest.setTimeout(100000) 
})

describe('User Controller - Login', () => {
    test('should log in a user with valid credentials', async () => {
      const userCredentials = {
        email: "test@gmail.com",
        password: "123"
      };
  
      const response = await request.post('/api/v1/users/login').send(userCredentials);
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();

    },7000);
  
    test('should handle login failure with invalid credentials', async () => {
      const invalidCredentials = {
        email: "nonexistent@example.com",
        password: "invalidpassword",
      };
  
      const response = await request.post('/api/v1/users/login').send(invalidCredentials);
  
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(undefined);
   
    },7000);
  
    test('should handle login failure with missing credentials', async () => {
      const response = await request.post('/api/v1/users/login').send({});
  
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(undefined);

    },7000);
  
  
    afterAll(() => {
       
        mongoose.connection.close();
    });
});

describe('User Registration', () => {
    // Test case for successful user registration
    test('should register a new user', async () => {
      const nuser = ({
        password: "3456563",
        email: "class@gmail.com",
        name: "Sherif Klala"
      });
      

      const response = await request.post('/api/v1/users/register').send(nuser); // Expecting a 201 Created status
      
      expect(response.body.success).toBe(true);
    
    },7000);
  
    // Test case for registering a user with an existing email (expecting failure)
    test('should fail to register a user with an existing email', async () => {
      const existingUser = {
        name: "Bala",
        email: "test@gmail.com",
        password: "098436",
      };
  
      // Register the existing user first
      await request.post('/api/v1/users/register').send(existingUser)
  
      // Attempt to register the same user again
      const response = await request.post('/api/v1/users/register').send(existingUser) // Expecting a 400 Bad Request status (or another appropriate status)
  
     
      expect(response.body.success).toBe(false);
 
    },7000);

    afterAll(() => {
        // Close the MongoDB connection after all tests
        mongoose.connection.close();
    });
});

