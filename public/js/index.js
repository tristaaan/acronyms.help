'use strict';

var app = angular.module('acroSearch', ['ngAnimate']);

app.factory('fetchService', function($http) {
  var my = {};
  my.fetch = function(query) {
    return $http({
      method: 'GET', 
      url: '/fetch/' + query
    });
  }

  my.recents = function(){
    return $http({
      method: 'GET', 
      url: '/recents'
    });
  }
  return my;
});

app.controller('queryController', function($scope, fetchService){

  fetchService.recents().success(function(res){
    $scope.acros = res;
  });
  
  // watch $scope.query, if the first letter changes fetch from the api.
  // any letter after the first can be filtered from the previously fetched results
  // clear the results if $scope.query.length == 0
  $scope.$watch('query', function(newVal, oldVal){
    newVal = newVal || '';
    oldVal = oldVal || '';
    if (newVal.length == 0){
      $scope.acros = [];
    }
    else if (newVal.length > 0 && newVal[0] != oldVal[0]){
      fetchService.fetch(newVal).success(function(res){
        $scope.acros = res;
      });
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