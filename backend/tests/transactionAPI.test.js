const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const Trans = require('../models/transectionModel')
// const api = supertest(app)
const helper = require('./helperTest')

const request = supertest(app);

beforeEach(async () => {
	// Increasing timeout otherwise sometimes a timeout error can wreck the whole testing phase
    jest.setTimeout(100000) 
})

  describe('Transaction', () => {

    test('should add a new transaction', async () => {
        const newTransaction = {
          userid: 'balajiagain',
          amount: 100,
          type: 'expense',
          category: 'food',
          refrence: '123',
          description: 'Lunch',
          date: '2023-12-12',
        };
      
        const response = await request.post('/api/v1/transections/add-transection').send(newTransaction);
      
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Transaction Created');
        
      });

      // test('should edit an existing transaction', async () => {
        
      //   // const transactionId = '65797cc1e10773d2d8ec26ff';
      //   const updatedTransaction = {
      //     userid: "balaji",
      //     amount: 150,
      //     description: 'Dinner',
      //   };
      //   // const sendTrans = {transactionId, updatedTransaction};
      
      //   const response = await request.post(`/api/v1/transections/edit-transection`).send(updatedTransaction);
      //   // const response = await request.post(`/api/v1/transections/edit-transection/${transactionId}`).send(updatedTransaction);
      
      //   expect(response.body.success).toBe(true);
      //   expect(response.body.message).toBe('Transaction Edited Successfully');
      //   // Additional assertions as needed
      // });
      

    

    afterAll(() => {
        // Close the MongoDB connection after all tests
        mongoose.connection.close();
    });
});
