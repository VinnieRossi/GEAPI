/**
 * Created by Vinnie on 8/14/2016.
 */
'use strict';

angular.module('twitter.TwitterController', ['ngCookies'])

  .controller('TwitterController', ['$scope', '$http', function($scope, $http) {
    var socket = io();
    $scope.tweets = [{}];


    socket.on('test', function(tweet) {
      //alert('HAPPENING');
      console.log(tweet.body);
      $scope.tweets.push(tweet);
      $scope.$apply();
    });

    $scope.openTwitterStream = function() {
      $http.get("/api/twitter/stream");
    }
  }]);
/*

 .factory('socket', function($rootScope) {
 var socket = io.connect();
 return {
 on: function(eventName, callback) {
 var args = arguments;
 $rootScope.$apply(function() {
 callback.apply(socket, args);
 })
 },
 emit: function(eventName, data, callback) {
 socket.emit(eventName, data, function() {
 var args = arguments;
 $rootScope.$apply(function() {
 if (callback) {
 callback.apply(socket, args);
 }
 })
 })
 }
 }
 });

 */
