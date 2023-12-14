const mongoose = require('mongoose')
const supertest = require('supertest')
const {ser,app} = require('../server')

const Trans = require('../models/transectionModel')
const User = require('../models/userModel')
// const api = supertest(app)
// const helper = require('./helperTest')

const request = supertest(app);

let createdTransaction;

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
  
  
    // afterAll(() => {
       
    //     mongoose.connection.close();
    // });
});

describe('User Registration', () => {
    // Test case for successful user registration
    // test('should register a new user', async () => {
    //   const nuser = ({
    //     password: "34123",
    //     email: "clauhs@gmail.com",
    //     name: "Sher Klaughing"
    //   });
      

    //   const response = await request.post('/api/v1/users/register').send(nuser); // Expecting a 201 Created status
      
    //   expect(response.body.success).toBe(true);
    
    // },7000);
  
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

    // afterAll(() => {
    //     // Close the MongoDB connection after all tests
    //     mongoose.connection.close();
    // });
});

describe('Transaction', () => {

    test('should add a new transaction', async () => {
      const newTransaction = {
        userid: 'balajiagai',
        amount: 100,
        type: 'expense',
        category: 'food',
        refrence: '123',
        description: 'Lunch',
        date: '2023-12-12',
      };
    
      const response = await request.post('/api/v1/transections/add-transection').send(newTransaction).expect(201);
      createdTransaction = response.body;
    });
  
        test('should edit an existing transaction', async () => {
          const updatedTransaction = {
            userid: 'balajiagain',
            amount: 100,
            type: 'expense',
            category: 'tip',
            refrence: '123',
            description: 'Lunch',
            date: '2023-12-12',
          };
          const response = await request.post(`/api/v1/transections/edit-transection`).send( updatedTransaction).expect(200);
        },7000);
        
     
  
        it('should delete a transaction', async () => {
          const resp = await request.post('/api/v1/transections/delete-transection').send({ transacationId: createdTransaction.userid }).expect(200);
        },7000);
  
        it('should handle invalid transaction ID', async () => {
          const invalidTransactionId = 'invalid-id';
      
          const response = await request.post('/api/v1/transections/delete-transection').send({ transacationId: invalidTransactionId }).expect(500);
        });
  
    
 
  });
  beforeAll(done => {
    done()
  })
  
  afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    ser.close();
    mongoose.connection.close()
    // done()
  })