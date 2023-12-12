const transactionModel = require("../models/transectionModel");
const moment = require("moment");
const logger = require('../logger');
const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json(error);
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transacationId });
    logger.info("Successful Deletion of Transaction");
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json(error);
  }
};
const editTransection = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transacationId },
      req.body.payload
    );
    logger.info(`Successful Edit of Transaction:
                  User ID: ${newTransaction.userid}, 
                  Amount: ${newTransaction.amount}, 
                  Type: ${newTransaction.type}, 
                  Category: ${newTransaction.category}, 
                  Reference: ${newTransaction.reference}, 
                  Description: ${newTransaction.description}, 
                  Date: ${newTransaction.date}`);
    res.status(200).send("Edit Successfully");
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    // logger.info("Successfully Added Transaction");
    logger.info(`Transaction created successfully: 
                  User ID: ${newTransaction.userid}, 
                  Amount: ${newTransaction.amount}, 
                  Type: ${newTransaction.type}, 
                  Category: ${newTransaction.category}, 
                  Reference: ${newTransaction.reference}, 
                  Description: ${newTransaction.description}, 
                  Date: ${newTransaction.date}`);
    res.status(201).send("Transaction Created");
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTrensaction,
  addTrensaction,
  editTrensaction,
  deleteTrensaction,
};
