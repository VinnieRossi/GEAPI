/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

angular.module('twitter.TwitterController', ['ngCookies'])

  .controller('TwitterController', ['$scope', '$http', 'appConfig', function($scope, $http, appConfig) {
    var socket = io();
    $scope.tweets = [];

    /*
          TODO LIST

    1. Create better css for responsive design
    2. Add rotating colors to author names - DONE
    3. Improve search input + button
    4. Create button that turns off scrollTop (in order to read tweet in fast flowing stream)
    5. Move colors to constants/env file - DONE

    */

    socket.on('tweet', function(tweet) {
      // Set maximum tweet count? 10-15?
      tweet.authorColor = appConfig.colors[$scope.tweets.length % appConfig.colors.length];

      $scope.tweets.push(tweet);
      $scope.$apply();

      // Update scroller content and height
      $('.scroller').perfectScrollbar('update');
      $('.scroller').scrollTop($('.scroller').children().height());
    });

    $scope.openTwitterStream = function() {
      // Maybe apply dull color to old tweets
      $scope.tweets.push({body: "___________________________________________"});
      $http.get("/api/twitter/stream/" + $scope.streamParam.replace("#", ""));
    };

  }]);
