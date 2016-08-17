import Twitter from 'twitter';
import Tweet from './tweet-model';

//Grab twitter variables from env file
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
var searchString = "";
var removeString = "";

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

export function stream(req, res) {
  var io = req.app.get('io');

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ status: 'OK' }));
  res.end();



  client.stream('statuses/filter', {track: req.params.word, language: 'en'}, function(stream) {
    console.log("Listening to twitter...\n");
    stream.on('data', function(data) {

      //Two issues:
      //1. It will only rewrite the previous stream when you get a new response - problematic when the previous stream is very popular and second isn't
      //2. Sometimes attempts at new stream auto-end? Could be due to the fact that it auto removes a second connection?
      console.log('===========================');
      console.log('--PARAM--' + req.params.word);
      console.log('--LAST SEARCH--' + getLastSearchString());
      console.log('--REMOVAL--' + getRemoveString());

      if (req.params.word !== getLastSearchString()) {
        if (req.params.word === getRemoveString()) {
          console.log("Removing: " + req.params.word);
          setRemoveString("");
          stream.destroy();
        } else {
          console.log("New last search: " + req.params.word);
          setRemoveString(getLastSearchString());
          setLastSearchString(req.params.word);
        }
      }

      var tweet = new Tweet({
        twid: data.id,
        author: data.user.name,
        screenname: data.user.screen_name,
        body: data.text,
        date: data.created_at
      });

      //console.log(tweet.author + ": " + tweet.body);

      //check if db contains content
      tweet.save(function(err) {
        if (err) {
          console.log(err + " :" + err.message)
        } else {
          io.emit("test", tweet);
        }
      });
    });

    stream.on('error', function(err) {
      handleError(err);
    });

    stream.on('end', function(err) {
      console.log("\n====================================================");
      console.log("DESTROYING");
      console.log("====================================================\n");
      stream.destroy();
    });

  });

  function getRemoveString() {
    return removeString;
  }

  function setRemoveString(word) {
    removeString = word;
  }


  function getLastSearchString() {
    return searchString;
  }

  function setLastSearchString(word) {
    searchString = word;
  }

  //swap lat/long, looks like it requires 1 unit min
  // Seattle Coords: -123,47,-122,48'
  //locations: '-123,47,-122,48'

  //client.get('search/tweets', {q: 'from:'}, function(error, tweets, response) {
  //  res.send(tweets).status(200);
  //});
}
