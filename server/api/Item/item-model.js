/**
 * Created by Vinnie on 7/2/2016.
 */
'use strict';

import mongoose from 'mongoose';

var ItemSchema = new mongoose.Schema({
  name: String,
  id: Number
});

export default mongoose.model('Item', ItemSchema);
