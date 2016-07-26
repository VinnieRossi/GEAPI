/**
 * Created by Vinnie on 7/2/2016.
 */
'use strict';

var express = require('express');
var controller = require('./item-server-ctrl');

var router = express.Router();
/*
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/
router.get('/osrs/baseList', controller.retrieveList);
router.get("/osrs/:itemID", controller.getItem);

module.exports = router;
