import Twitter from 'twitter';
import Tweet from './tweet-model';

//Grab twitter variables from env file
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

export function stream(req, res) {
  client.stream('statuses/filter', {track: 'javascript', language: 'en'}, function(stream) {
    console.log("Listening to twitter...\n");
    stream.on('data', function(data) {

      //console.log(data);
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

        }
      });


      /*
       tweet.save(function(err) {
       if (err) {
       if(err.code === 11000) {
       console.log('duplicate');
       }
       }
       console.log('saved');

       });
       */


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
