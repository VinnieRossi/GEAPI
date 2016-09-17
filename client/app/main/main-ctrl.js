'use strict';

angular.module('main.MainController', ['ngCookies'])

  .controller('MainController', ['$scope', '$http', function($scope, $http) {

    /*
     TODO LIST

     1. Create better css for responsive design
     2. Add rotating colors to author names - DONE
     3. Improve search input + button - DONE
     4. Create button that turns off scrollTop (in order to read tweet in fast flowing stream)
     5. Move colors to constants/env file - DONE
     6. Create navbar links - DONE
     7. Cancel stream on navigate away - DONE (could still be improved)
     8. Move osrs logic to osrs page instead of homepage - DONE
     9. Move quicksort logic to shared service
     */

  }]);


/*
 .factory('Thing', ['$resource', function($resource) {
 return $resource('/api/:thingID', {
 thingID: '@_id'
 }, {
 update: {
 method: 'PUT'
 }
 })
 }])
 */
