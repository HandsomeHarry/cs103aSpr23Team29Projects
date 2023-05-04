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

// Summary of transactions
// Harry Yu

  router.get('/transactions/summary',
  isLoggedIn,
  async (req, res, next) => {
    const summaryType = req.query.summaryType;
    const transactions = await Transaction.find({ userId: req.user._id });

    let summary;
    switch (summaryType) {
      case 'date':
        summary = summarizeByDate(transactions);
        break;
      case 'month':
        summary = summarizeByMonth(transactions);
        break;
      case 'year':
        summary = summarizeByYear(transactions);
        break;
      case 'category':
        summary = summarizeByCategory(transactions);
        break;
      default:
        return res.status(400).send('Invalid summary type');
    }

    res.locals.summary = summary;
    res.render('summary');
  });

// Summarize by date
// Harry Yu

  function summarizeByDate(transactions) {
    const summary = {};
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!summary[date]) {
        summary[date] = 0;
      }
      summary[date] += transaction.amount;
    });
    return summary;
  }

// Summarize by month
// Harry Yu

  function summarizeByMonth(transactions) {
    const summary = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const monthKey = `${year}-${month}`;
  
      if (!summary[monthKey]) {
        summary[monthKey] = 0;
      }
      summary[monthKey] += transaction.amount;
    });
    return summary;
  }

// Summarize by year
// Harry Yu

  function summarizeByYear(transactions) {
    const summary = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
  
      if (!summary[year]) {
        summary[year] = 0;
      }
      summary[year] += transaction.amount;
    });
    return summary;
  }

// Summarize by category
// Harry Yu

  function summarizeByCategory(transactions) {
    const summary = {};
    transactions.forEach(transaction => {
      const category = transaction.category;
      if (!summary[category]) {
        summary[category] = 0;
      }
      summary[category] += transaction.amount;
    });
    return summary;
  }

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