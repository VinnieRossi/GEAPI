'use strict';


angular.module('meanApp')


  .controller('NavbarController', function($scope) {
    $scope.nav = [{title: "Home", link: "/"}, {title: "Twitter", link: "/twitter"}, {title: "Dead", link: "/"}, {title: "Links", link: "/"}];
  });
