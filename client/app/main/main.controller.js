'use strict';

angular.module('meanApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/users').success(function(users) {
      $scope.users = users
      socket.syncUpdates('user', $scope.users)
    });

    $scope.createUser = function(){
      if($scope.user && $scope.user.id) {
        $http.post('/api/users', $scope.user).success(function(){
          $scope.user.id = ''
        })
      }
    }
    $scope.deleteUser = function(user) {
      $http.delete('/api/users/' + user._id);
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
