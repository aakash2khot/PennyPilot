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

	// await User.deleteMany({})
	// await User.insertMany(helper.initialUsers)
})

// describe('User Controller - Login', () => {
//     test('should log in a user with valid credentials', async () => {
//       const userCredentials = {
//         email: "Balaji.Sankapal@iiitb.ac.in",
//         password: "12345"
//       };
  
//       const response = await request.post('/api/v1/users/login').send(userCredentials);
  
//       expect(response.status).toBe(200);
//       expect(response.body.success).toBe(true);
//       expect(response.body.user).toBeDefined();
//       // Add more assertions as needed based on your response structure
//     },7000);
  
//     test('should handle login failure with invalid credentials', async () => {
//       const invalidCredentials = {
//         email: "nonexistent@example.com",
//         password: "invalidpassword",
//       };
  
//       const response = await request.post('/api/v1/users/login').send(invalidCredentials);
  
//       expect(response.status).toBe(404);
//       expect(response.body.success).toBe(undefined);
//     //   expect(response.body.error).toBe('User Not Found');
//       // Add more assertions as needed based on your response structure
//     },7000);
  
//     test('should handle login failure with missing credentials', async () => {
//       const response = await request.post('/api/v1/users/login').send({});
  
//       expect(response.status).toBe(404);
//       expect(response.body.success).toBe(undefined);
//     //   expect(response.body.error).toBeDefined();
//       // Add more assertions as needed based on your response structure
//     },7000);
  
  
//     afterAll(() => {
//         // Close the MongoDB connection after all tests
//         mongoose.connection.close();
//     });
// });

describe('User Registration', () => {
    // Test case for successful user registration
    // test('should register a new user', async () => {
    //   const nuser = ({
    //     password: "3456563",
    //     email: "class@gmail.com",
    //     name: "Sherif Klala"
    //   });
      

    //   const response = await request.post('/api/v1/users/register').send(nuser); // Expecting a 201 Created status
    //   // Additional assertions based on your response format
    //   expect(response.body.success).toBe(true);
    // //   expect(response.body.newUser).toBeDefined();
    //   // expect(response.body.user.name).toBe(nuser.name);
    //   // expect(response.body.nuser.email).toBe(nuser.email);
    //   // Add more assertions as needed
    // },7000);
  
    // Test case for registering a user with an existing email (expecting failure)
    test('should fail to register a user with an existing email', async () => {
      const existingUser = {
        name: "Bala",
        email: "Balanapal@iiitb.ac.in",
        password: "098436",
      };
  
      // Register the existing user first
      await request.post('/api/v1/users/register').send(existingUser)
  
      // Attempt to register the same user again
      const response = await request.post('/api/v1/users/register').send(existingUser) // Expecting a 400 Bad Request status (or another appropriate status)
  
      // Additional assertions based on your response format
      expect(response.body.success).toBe(false);
    //   expect(response.body.error).toBeDefined();
    //   expect(response.body.error).toBe('User with this email already exists.');
      // Add more assertions as needed
    },7000);

    afterAll(() => {
        // Close the MongoDB connection after all tests
        mongoose.connection.close();
    });
});

