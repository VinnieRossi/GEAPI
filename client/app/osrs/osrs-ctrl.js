/**
 * Created by Vinnie on 9/17/2016.
 */
'use strict'

angular.module('osrs.OsrsController', [])


.controller('OsrsController', ['$scope', '$http', function($scope, $http) {

    // Get JSON list of all items. Store to cache when I have more than 1 page?
    $http.get("/api/osrs/baseList").then(function(response){
      $scope.items = response.data;

      //default option to not having poison items?

      //alphabetize array
      quickSort($scope.items, 0, $scope.items.length - 1);
      //addAliasNames();

    }, function(err) {
      //handle
    });

    // Change this to use item resource
    $scope.findItem = function(itemID) {
      $http.get("/api/osrs/" + itemID).then(function(response){
        $scope.item = response.data.item;
        //go to server and request
      }, function(err) {
        //handle
      });
    };


    //move quicksort to services
    function swap(array, firstIndex, secondIndex) {
      var temp = array[firstIndex];
      array[firstIndex] = array[secondIndex];
      array[secondIndex] = temp;
    }

    function partition(array, left, right) {
      var pivot = array[Math.floor((right + left) / 2)];

      while (left <= right) {

        //Find left swap
        while(array[left].name < pivot.name) {
          left++;
        }

        //Find right swap
        while(array[right].name > pivot.name) {
          right--;
        }
        //Swap
        if(left <= right) {
          swap(array, left, right);
          left++;
          right--;
        }
      }

      return left;
    }

    function quickSort(array, left, right) {
      var index;

      if (array.length > 1) {
        index = partition(array, left, right);

        if (left < index - 1) {
          quickSort(array, left, index - 1);
        }

        if (index < right) {
          quickSort(array, index, right);
        }
      }
      return array;
    }

    $scope.search = function() {
      $scope.searchItems = [];
      if ($scope.userInput === "") return;
      // if user input is in shortcut (bcp, ags, bgs, acb, zgs, sgs, dds, etc
      // do this a better way
      if ($scope.userInput === "bcp") $scope.searchItems.push("Bandos Chestplate");
      if ($scope.userInput === "ags") $scope.searchItems.push("Armadyl Godsword");

      // Start searching at first letter
      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].name.toLowerCase().charAt(0) === $scope.userInput.charAt(0)) {
          break;
        }
      }

      for (; i < $scope.items.length; i++) {
        if ($scope.items[i].name.toLowerCase().indexOf($scope.userInput.toLowerCase()) > -1) {
          $scope.searchItems.push($scope.items[i]);
        }

        if ($scope.searchItems.length >= 5) {
          break;
        }
      }
    };

  }]);
