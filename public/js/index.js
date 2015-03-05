'use strict';

var app = angular.module('acro', []);

app.controller('queryController', ['$scope', function($scope){
  //$scope.query="";
  $scope.arcos = {
    nsfw: "not safe for work",
    sfw: "safe for work",
    smh: "shaking my head",
    iirc: "if I read correctly",
    tbh: "to be honest",
    brb: "be right back",
    gtg: "got to go",
    g2g: "good to go",
    omg: "oh my god",
    omfg: "oh my fucking god",
    wtf: "what the fuck",
    lol: "laughing out loud",
    rofl: "rolling on the floor laughing",
    lmao: "laughing my ass off"
  };
  $scope.arcoKeys = Object.keys($scope.arcos).sort();
}]);

app.directive('smileyInput', function() {
  return {
    restrict: 'A',
    template: '<input type="text" ng-model="query"><span id="smiley">:-)</span>',
    link: function(scope, element, attrs) {
      var input = element.find('input');
      var smiley = element.find('span');
      input.on('focus blur', function() {
        smiley.toggleClass('rotate');
      });
    }
  };
});