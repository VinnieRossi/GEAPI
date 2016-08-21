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
    });

    $scope.openTwitterStream = function() {
      // Maybe cycle font colors depending on search instead of bar
      $scope.tweets.push({body: "-------------------------------------------------------------------"});
      $http.get("/api/twitter/stream/" + $scope.streamParam);
    };
  }]);
