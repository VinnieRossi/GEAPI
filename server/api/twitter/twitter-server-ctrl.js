import Twitter from 'twitter';
import Tweet from './tweet-model';

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

export function stream(req, res) {
  var io = req.app.get('io');

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ status: 'OK' }));
  res.end();

  client.stream('statuses/filter', {track: 'harambe', language: 'en'}, function(stream) {
    console.log("Listening to twitter...\n");
    stream.on('data', function(data) {

      var tweet = new Tweet({
        twid: data.id,
        author: data.user.name,
        screenname: data.user.screen_name,
        body: data.text,
        date: data.created_at
      });

      console.log(tweet.author + ": " + tweet.body + "\n");
      //check if db contains content
      tweet.save(function(err) {
        if (err) {
          console.log(err + " :" + err.message)
        } else {
          io.emit("test", tweet);
        }
      });
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
