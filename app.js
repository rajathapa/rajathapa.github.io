var app = angular.module('myApp', ['ui.mask']);

app.controller('MainCtrl', ['$scope', function ($scope) {
  var vm = this;
  vm.name = 'Ui Mask';
  vm.phone = '';
  vm.defaultPlaceholder = '04XX XXX XXX';
// mimic refresh
  if (localStorage.phone != '') {
    vm.phone = localStorage.phone;
  }
}]);

app.directive('customPlaceholder', [function () {
  return {
    scope: {
      phoneNumber: "=",
      pholder: "="
    },
    link: function (scope, element, attr) {
      var defaultMask = '(99) 9999 9999';
      var mobileMask = '9999 999 999';
      var regExpMobilePrefix = '(^[1][38]00)|(^04)';
      var re = new RegExp(regExpMobilePrefix);

      angular.element(document).ready(function () {
        if(scope.phoneNumber){
          maskPhoneNumber();
        }
      });

      element.on('focus', function () {
        if (!scope.phoneNumber) {
          attr.$set('uiMask', mobileMask);
          setPlaceholder(attr, mobileMask);
        }
      });

      element.on('keyup', function () {
        console.log(scope.phoneNumber);
        if (!scope.phoneNumber) {
          return;
        };
        maskPhoneNumber();
      });

      element.on('focusout', function () {
        if (!scope.phoneNumber) {
          attr.$set('uiMask', mobileMask);
          attr.$set('placeholder', scope.pholder);
        }
      });

      function maskPhoneNumber() {
        if (scope.phoneNumber.match(re)) {
          attr.$set('uiMask', mobileMask);
          setPlaceholder(attr, mobileMask);
        }
        else {
          attr.$set('uiMask', defaultMask);
          setPlaceholder(attr, defaultMask);
        }

        localStorage.phone = scope.phoneNumber;
      }

      function setPlaceholder(attr, value){
        var replacePattern = /[a-zA-Z0-9]/g;
        attr.$set('placeholder', value.replace(replacePattern, '_'));
      }
    }
  }
}]);
