
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var transaction = Schema( {
  description:String,
  amount: Number,
  category: String,
  date: String,
  userId: ObjectId
  } );

module.exports = mongoose.model( 'transaction', transaction );
