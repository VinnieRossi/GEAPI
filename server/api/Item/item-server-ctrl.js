/**
 * Created by Vinnie on 7/2/2016.
 */
import _ from 'lodash';
import Thing from './item-model';
import http from 'http';
import fs from 'fs';




//Utility functions
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function retrieveList(req, res) {
  fs.readFile('server/api/item/osrs_items.json', 'utf8', function(err, data) {
    if (err) handleError(res);
    res.send(JSON.parse(data)).status(200);
  });
}

export function getItem(req, res) {

  /*
   var options = {
   host: 'services.runescape.com',
   path: '/m=itemdb_oldschool/api/graph/' + req.params.itemID + '.json',
   method: 'GET'
   };
   */

  var options = {
    host: 'services.runescape.com',
    path: '/m=itemdb_oldschool/api/catalogue/detail.json?item=' + req.params.itemID,
    method: 'GET'
  };

  return http.get(options, function(response) {
    response.on('data', function(chunk){
      //respondWithResult(chunk, 200); //not working?
      res.setHeader('Content-Type', 'text/javascript');
      res.send(chunk).status(200);
    });
  }).on("error", function(e){
    res.send(e.mesasge).status(500);
  });
}
