'use strict';


angular.module('meanApp')


  .controller('NavbarController', function($scope) {
    $scope.nav = [{title: "These", link: "/"}, {title: "Are", link: "/"}, {title: "Dead", link: "/"}, {title: "Links", link: "/"}];
  });
