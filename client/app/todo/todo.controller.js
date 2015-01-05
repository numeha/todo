'use strict';

var app = angular.module('meanApp')



app.controller('TodoCtrl', function($stateParams, $filter, $scope, $http, socket) {
  $scope.editing = null;

  $scope.user = {
    id: 1,
    name: 'awesome user',
    status: 2,
    group: 4,
    groupName: 'admin'
  };

  $scope.statuses = [{
    value: 1,
    text: 'status1'
  }, {
    value: 2,
    text: 'status2'
  }, {
    value: 3,
    text: 'status3'
  }, {
    value: 4,
    text: 'status4'
  }];

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function() {
    if ($scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {
        id: $scope.user.group
      });
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return $scope.user.groupName;
    }
  };

  $scope.checkName = function(data) {
    // if (data !== 'awesome' && data !== 'error') {
    //   return "Username should be `awesome` or `error`";
    // }
  };

  $scope.saveUser = function() {
    console.log($scope.user);

    // $scope.user already updated!
    return $http.post('/saveUser', $scope.user).error(function(err) {
      if (err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"}
        $scope.editableForm.$setError(err.field, err.msg);
      } else {
        // unknown error
        $scope.editableForm.$setError('name', 'Unknown error!');
      }
    });
  };


  // $scope.message = 'Hello';
  // $scope.todos = [];
  //
  // $http.get('/api/things').success(function()) {
  //   $scope.todos = [{title:'1'}, {title:'2'}];
  // }
  console.log('id:' + $stateParams.id);

  $scope.todo_title = $stateParams.id + "'s todo"
  $scope.todos = [];

  // $http.get('/api/things').success(function() {
  //   $scope.todos = [{title:'1'},{title:'1'}];
  // });
  $http.get('/api/todos/' + $stateParams.id).success(function(todos) {
    $scope.todos = todos
    socket.syncUpdates('todo', $scope.todos)
  });

  $scope.createTodo = function() {
    $scope.todo.name = $stateParams.id
    if ($scope.todo && $scope.todo.title) {
      $http.post('/api/todos/', $scope.todo).success(function() {
        $scope.todo.title = '';
      });
    }
  };

  $scope.editTodo = function(todo) {
    // console.log(todo);
    $scope.editing = todo;
  }

  $scope.updateTodo = function() {
    console.log($scope.editing.duedate);
    // $scope.editing.duedate = 
    if ($scope.editing && $scope.editing.title) {
      $http.put('/api/todos/' + $scope.editing._id, $scope.editing).success(function() {
      });
    }
  };

  $scope.deleteTodo = function(todo) {
    $http.delete('/api/todos/' + todo._id);
  };


  $scope.datePickerOpen = false;
  $scope.toggleDatePicker = function($event) {
    // これが重要！！！
    $event.stopPropagation();

    $scope.datePickerOpen = !$scope.datePickerOpen;
  };
});
