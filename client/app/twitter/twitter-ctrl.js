/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

angular.module('twitter.TwitterController', ['ngCookies'])

  .controller('TwitterController', ['$scope', '$http', 'appConfig', '$rootScope', function($scope, $http, appConfig, $rootScope) {
    var socket = io();
    $scope.tweets = [];

    socket.on('tweet', function(tweet) {
      // Set maximum tweet count? 10-15?
      tweet.authorColor = appConfig.colors[$scope.tweets.length % appConfig.colors.length];
      $scope.tweets.push(tweet);
      $scope.$apply();

      // Update scroller content and height, then scroll to the bottom
      $('.scroller').perfectScrollbar('update');
      $('.scroller').scrollTop($('.scroller').children().height());
    });

    $scope.openTwitterStream = function() {
      // Maybe apply dull color to old tweets
      $scope.tweets.push({body: "___________________________________________"});
      $http.get("/api/twitter/stream/" + $scope.streamParam.replace("#", ""));
    };

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // disable stream. find a way to only do this if leaving this scope.
      $http.get("/api/twitter/streamCancel");
    })
  }]);
