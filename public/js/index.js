'use strict';
require('angular');
require('angular-animate');
require('../css/style.css');

var app = angular.module('acroSearch', ['ngAnimate']),
  data = require('../../sampledata/data.json');

app.factory('fetchService', ['$http', function($http) {
  var my = {};

  function pick (src, regexp) {
    return Object.keys(src).filter(function(el) {
      if (regexp.test(el)) {
        return el;
      }
    }).map(function(el) {
      return data[el];
    });
  }

  my.fetch = function(query) {
    return pick(data, new RegExp('^' + query));
  }

  return my;
}]);

app.controller('queryController', ['$scope', 'fetchService', function($scope, fetchService){
  // watch $scope.query, if the first letter changes fetch from the api.
  // any letter after the first can be filtered from the previously fetched results
  // clear the results if $scope.query.length == 0
  $scope.$watch('query', function(newVal, oldVal){
    newVal = newVal || '';
    oldVal = oldVal || '';
    if (newVal.length == 0){
      $scope.acros = [];
    } else if (newVal.length > 0 && newVal[0] != oldVal[0]){
      $scope.acros = fetchService.fetch(newVal);
    }
  });
}]);

app.directive('smileyInput', function() {
  return {
    restrict: 'A',
    template: '<input type="text" ng-model="query" autofocus><span id="smiley">:-)</span>',
    link: function(scope, element, attrs) {
      var input = element.find('input');
      var smiley = element.find('span');
      input.on('focus blur', function() {
        smiley.toggleClass('rotate');
      });
    }
  };
});