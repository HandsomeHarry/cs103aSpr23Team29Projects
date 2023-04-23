
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var transaction = Schema( {
  description:String,
  amount: Number,
  category: String,
  date: Date,
  } );

module.exports = mongoose.model( 'transaction', transaction );
