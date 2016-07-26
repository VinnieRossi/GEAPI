/**
 * Created by Vinnie on 6/26/2016.
 */
'use strict';

angular.module('main.routes', [])

  .config(function($routeProvider) {
    $routeProvider.when('/', {
      title: 'Main',
      controller: 'MainController',
      templateUrl: 'app/main/main.html'
    }).otherwise({
      redirectTo: '/'
    });
  });
