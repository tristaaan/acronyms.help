'use strict';

var app = angular.module('acro', []);

app.factory('fetchService', function($http) {
  var my = {};
  my.fetch = function(query) {
    return $http({
      method: 'GET', 
      url: '/fetch/' + query
    });
  }
  return my;
});

app.controller('queryController', function($scope, fetchService){
  $scope.$watch('query', function(newVal){
    newVal = newVal || '';
    if (newVal.length > 0){
      fetchService.fetch(newVal).success(function(res){
        $scope.acros = res;
      });
    }
    else{
      $scope.acros = [];
    }
  });
});

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