/*
  store.js -- Router for the Transactions - Zared COhen
*/
const express = require('express');
const bodyParser = require('body-parser'); //for reading values
const router = express.Router();
const Transaction = require('../models/Transaction');

// get the value associated with the key
router.get('/transactions/',
  isLoggedIn,
  async (req, res, next) => {
    const transactions = await Transaction.find({ userId: req.user._id });
    console.log('Fetched transactions:', transactions); // Log the fetched transactions
    res.locals.transactions = transactions;
    res.render('transactions');
  });

/* add the value in the body to the list associated with the key */
router.post('/transactions',
  isLoggedIn,
  async (req, res, next) => {
    const transaction = new Transaction(
      {
        userId: req.user._id,
        description: req.body.description,
        category: req.body.category,
        amount: req.body.amount,
        date: new Date(req.body.date).toDateString()
      });
    const savedTransaction = await transaction.save();
    console.log('Saved transaction:', savedTransaction); // Log the saved transaction
    res.redirect('/transactions');
  });


router.get('/transactions/delete/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /transactions/remove/:itemId")
    await Transaction.deleteOne({ _id: req.params.itemId });
    res.redirect('/transactions')
  });

// Sort transactions by date
// Aaron Tang
router.get('/transactions/sortBy=date',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ date: 1 })
    res.render('transactions');
  });

// Sort transactions by amount
// Aaron Tang
router.get('/transactions/sortBy=amount',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ amount: 1 });
    res.render('transactions');
  });

// Sort transactions by category
// Aaron Tang
router.get('/transactions/sortBy=category',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ category: 1 });
    res.render('transactions');
  });


// Sort transactions by description
// Aaron Tang
router.get('/transactions/sortBy=description',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ description: 1 });
    res.render('transactions');
  });

module.exports = router;

