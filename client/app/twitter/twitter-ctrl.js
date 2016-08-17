/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

angular.module('twitter.TwitterController', ['ngCookies'])

  .controller('TwitterController', ['$scope', '$http', function($scope, $http) {
    var socket = io();
    $scope.tweets = [{}];


    socket.on('test', function(tweet) {
      console.log(tweet.body);
      // add logic to limit # tweets to 10-15 (maybe option to preserve log)
      $scope.tweets.push(tweet);
      $scope.$apply();
    });

    $scope.openTwitterStream = function() {
      $scope.tweets.push({body: "-------------------------------------------------------------------"});
      $http.get("/api/twitter/stream/" + $scope.streamParam);
    }
  }]);
