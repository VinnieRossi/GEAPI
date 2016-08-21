/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

angular.module('twitter.TwitterController', ['ngCookies'])

  .controller('TwitterController', ['$scope', '$http', function($scope, $http) {
    var socket = io();
    $scope.tweets = [];

    var colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

    /*
          TODO LIST

    1. Create better css for responsive design
    2. Add rotating colors to author names - DONE
    3. Improve search input + button
    4. Create button that turns off scrollTop (in order to read tweet in fast flowing stream)
    5. Move colors to constants/env file.

    */

    socket.on('tweet', function(tweet) {
      // Set maximum tweet count? 10-15?
      tweet.authorColor = colors[$scope.tweets.length % colors.length];

      $scope.tweets.push(tweet);
      $scope.$apply();

      // Update scroller content and height
      $('.scroller').perfectScrollbar('update');
      $('.scroller').scrollTop($('.scroller').children().height());
    });

    $scope.openTwitterStream = function() {
      // Maybe apply dull color to old tweets
      $scope.tweets.push({body: "___________________________________________"});
      $http.get("/api/twitter/stream/" + $scope.streamParam);
    };
  }]);
