'use strict';

angular.module('meanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todo', {
        url: '/todo/:id',
        templateUrl: 'app/todo/todo.html',
        controller: 'TodoCtrl'
      });
  });
