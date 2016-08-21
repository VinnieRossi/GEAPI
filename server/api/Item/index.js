/**
 * Created by Vinnie on 7/2/2016.
 */
'use strict';

var express = require('express');
var controller = require('./item-server-ctrl');

var router = express.Router();

router.get('/baseList', controller.retrieveList);
// Have this last, as it will catch anything with /api/osrs/...
router.get("/:itemID", controller.getItem);


module.exports = router;
