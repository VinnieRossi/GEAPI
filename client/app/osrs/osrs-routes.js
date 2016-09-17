/**
 * Created by Vinnie on 9/17/2016.
 */
'use strict'

angular.module('osrs.routes', [])


.config(function($routeProvider) {
    $routeProvider.when('/osrs', {
      title: 'Osrs',
      controller: 'OsrsController',
      templateUrl: 'app/osrs/osrs.html'
    }).otherwise({
      redirectTo: '/'
    });
  });
