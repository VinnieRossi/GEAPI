'use strict';

angular.module('meanApp',
  ['meanApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'btford.socket-io',
    'main'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
