/*
  store.js -- Router for the Transactions - Zared COhen
*/
const express = require('express');
const bodyParser = require('body-parser'); //for reading values
const router = express.Router();
const Transaction = require('../models/Transaction')


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

// get the value associated to the key
router.get('/transactions',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({userId:req.user._id})
    res.render('transactions');
});

/* add the value in the body to the list associated to the key */
router.post('/transactions',
  isLoggedIn,
  async (req, res, next) => {
    const transaction = new Transaction(
      {description: req.body.description,
       category: req.body.category,
       amount: req.body.amount,
       date: new Date(req.body.date)
      })
    await transaction.save();
  
    res.redirect('/transactions'); // Redirect to the transactions page
});

router.get('/transactions/delete/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transactions/remove/:itemId")
      await Transaction.deleteOne({_id:req.params.itemId});
      res.redirect('/transactions')
});



module.exports = router;
