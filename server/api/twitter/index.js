/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

var express = require('express');
var controller = require('./twitter-server-ctrl');

var router = express.Router();

router.get("/stream", controller.stream);

module.exports = router;
