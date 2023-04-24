/*
  store.js -- Router for the Transactions
*/
const express = require('express');
const bodyParser = require('body-parser'); //for reading values
const router = express.Router();
const Transaction = require('../models/Transaction');

//Post 
//Zared Cohen
router.post('/transactions',
  isLoggedIn,
  async (req, res, next) => {
    const transaction = new Transaction(
      {
        userId: req.user._id,
        description: req.body.description,
        category: req.body.category,
        amount: req.body.amount,
        date: new Date(req.body.date)
      })
    await transaction.save();
    res.redirect('/transactions'); // Redirect to the transactions page
  });

//Delete item
//Zared Cohen
router.get('/transactions/delete/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    await Transaction.deleteOne({ _id: req.params.itemId });
    res.redirect('/transactions')
  });

//Edit item
//Aaron Tang
router.get('/transactions/edit/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /transactions/edit/:itemId")
    const item =
      await Transaction.findById({ _id: req.params.itemId });
    res.locals.item = item
    res.render('edit')
  });

//Update item
//Aaron Tang
router.post('/transactions/updateTransaction',
  isLoggedIn,
  async (req, res, next) => {
    const { itemId, description, category, amount, date } = req.body;
    console.log("inside /transaction/edit/:itemId");
    await Transaction.findOneAndUpdate(
      { _id: itemId },
      { $set: { description, category, amount, date } });
    res.redirect('/transactions')
  });

// Sort transactions
// Harry Yu
router.get('/transactions',
  isLoggedIn,
  async (req, res, next) => {
    const sortBy = req.query.sortBy;
    console.log(sortBy);

    if (sortBy === 'description') {
      res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ description: 'asc' });
    } else if (sortBy === 'amount') {
      res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ amount: 'asc' });
    } else if (sortBy === 'category') {
      res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ category: 'asc' });
    } else if (sortBy === 'date') {
      res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ date: 'asc' });
    } else {
      res.locals.transactions = await Transaction.find({ userId: req.user._id });
    }
    res.render('transactions');
  });

// Group transactions by category
// Harry Yu
router.get('/transactions/byCategory',
  isLoggedIn,
  async (req, res) => {
    const userId = req.user._id;
    const transactions = await Transaction.find({ userId });
    const groupedTransactions = {};
    transactions.forEach(function (transaction) {
      if (!groupedTransactions[transaction.category]) {
        groupedTransactions[transaction.category] = 0;
      }
      groupedTransactions[transaction.category] += parseFloat(transaction.amount);
    });
    const categories = Object.keys(groupedTransactions);
    res.render('byCategory', { categories, groupedTransactions });
  });

module.exports = router;