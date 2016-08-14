'use strict';

import mongoose from 'mongoose';

var TweetSchema = new mongoose.Schema({
  twid: {type: Number, unique: true, dropDubs: true},
  author: String,
  screenname: String,
  body: String,
  date: Date
});

export default mongoose.model('Tweet', TweetSchema);
