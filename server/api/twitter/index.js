/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

var express = require('express');
var controller = require('./twitter-server-ctrl');

var router = express.Router();

router.get("/stream/:word", controller.stream);
router.get("/streamCancel", controller.streamCancel);

module.exports = router;
