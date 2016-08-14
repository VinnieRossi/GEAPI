/**
 * Created by Vinnie on 7/2/2016.
 */
import _ from 'lodash';
import Thing from './item-model';
import http from 'http';
import fs from 'fs';
import Twitter from 'twitter';
import Tweet from './tweet-model';


/*
var client = new Twitter({
  consumer_key: 'v7S7PSceaCxFSoV54wTAxybhY',
  consumer_secret: 'TXV1HoZPLILxl9b7x7X6eghdtIVnYsVVigOAgtVjOPXDgOfLuA',
  access_token_key: '763724077110534144-c9RtbXw6yw5fImRhCwGnhwweFbmdC2E',
  access_token_secret: 'cYnMEFeS6OwFh52DV8ss6XX6nGbme8OdcXGgn9kaRKbf0'
});
*/

//Grab twitter variables from env file
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

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

  export function tweet(req, res) {

    client.stream('statuses/filter', {track: 'javascript', language: 'en'}, function(stream) {
      console.log("Listening to twitter...\n");
      stream.on('data', function(data) {

        //console.log(data);
          var tweet = {
            twid: data.id,
            author: data.user.name,
            screenname: data.user.screen_name,
            body: data.text,
            date: data.created_at
          };

          console.log(tweet.author + ": " + tweet.body + "\n");
        Tweet.create(tweet);
        // save tweet to DB
        //emit tweet with socket.io

      });

      stream.on('error', function(err) {
        handleError(err);
      })
    });

    //swap lat/long, looks like it requires 1 unit min
    // Seattle Coords: -123,47,-122,48'
    //locations: '-123,47,-122,48'

    //client.get('search/tweets', {q: 'from:'}, function(error, tweets, response) {
    //  res.send(tweets).status(200);
    //});
}

//kailinnnsamm
