/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

angular.module('twitter.TwitterController', ['ngCookies'])

  .controller('TwitterController', ['$scope', '$http', function($scope, $http) {
    var socket = io();
    $scope.tweets = [];

    socket.on('tweet', function(tweet) {
      // Set maximum tweet count? 10-15?
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
