'use strict';


angular.module('main.MainController', [])



  .controller('MainController', ['$scope', '$http', 'Thing', function($scope, $http, Thing) {

    //$scope.$http = $http;
    //$scope.socket = socket;

    //$scope.awesomeThings = [];
    var orgArray = [];



    //Thing.query(function(things) {
    //  $scope.awesomeThings = things;
    //});

    // Get JSON list of all items
    $http.get("/api/osrs/baseList").then(function(response){
      $scope.items = response.data;

      //alphabetize array
      for (var i = 0; i < $scope.items.length; i++) {
        orgArray.push($scope.items[i].name);
      }
      orgArray.sort();

    }, function(err) {
      //thing
    });


    // Change this to use item resource
    $scope.findItem = function(itemID) {
      $http.get("/api/osrs/" + itemID).then(function(response){
        $scope.item = response.data.item;
        //go to server and request
      }, function(err) {
        //thing
      });
    };

/*
     $scope.addThing = function() {

       var thing = new Thing({
         name: this.name
       });

       thing.$save(function(response) {
         $scope.awesomeThings.push(response);
         }, function(err) {
           // lol fix this
           //alert(err);
         });
     };

     $scope.deleteThing = function(thing) {
       if (thing) {
         thing.$remove(function(){
           for (var i in $scope.awesomeThings) {
             if ($scope.awesomeThings[i] === thing) {
               $scope.awesomeThings.splice(i, 1);
             }
           }
           });
         } else {
          // Don't remove, thing doesn't exist
       }
     };
*/
    $scope.search = function() {
      //start searching at the letter first, then go through everything
      $scope.searchItems = [];
      if ($scope.userInput === "") return;
      // if user input is in shortcut (bcp, ags, bgs, acb, zgs, sgs, dds, etc
      // do this a better way
      if ($scope.userInput === "bcp") $scope.searchItems.push("Bandos Chestplate");
      if ($scope.userInput === "ags") $scope.searchItems.push("Armadyl Godsword");

      //start on letter
      for (var i = 0; i < orgArray.length; i++) {
        if (orgArray[i].toLowerCase().charAt(0) === $scope.userInput.charAt(0)) {
          break;
        }
      }

      for (; i < orgArray.length; i++) {
        if (orgArray[i].toLowerCase().indexOf($scope.userInput.toLowerCase()) > -1) {
          $scope.searchItems.push(orgArray[i]);
        }

        if ($scope.searchItems.length >= 5) {
          break;
        }
      }
    };

    $scope.selectItem = function(name) {
      $scope.userInput = name;
      $scope.searchItems = [];

      //implement with new method. find on original array with name

      // show loading indicator
      for(var i = 0; i < $scope.items.length; i++){
        if ($scope.items[i].name === name) {
          $scope.findItem($scope.items[i].id);

          // then hide loading indicator
        }
      }
    };

  }])


  .factory('Thing', ['$resource', function($resource) {
    return $resource('/api/:thingID', {
      thingID: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }]);


