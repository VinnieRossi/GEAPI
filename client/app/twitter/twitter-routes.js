/**
 * Created by Vinnie on 8/14/2016.
 */
angular.module('twitter.routes', [])

  .config(function($routeProvider) {
    $routeProvider.when('/twitter', {
      title: 'Twitter',
      controller: 'TwitterController',
      templateUrl: 'app/twitter/twitter.html'
    }
    );
  });
