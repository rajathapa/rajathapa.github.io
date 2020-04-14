var app = angular.module('myApp', ['ui.mask']);

app.controller('MainCtrl', ['$scope', function ($scope) {
  var vm = this;
  vm.defaultMask = '(99) 9999 9999';
  vm.mobileMask = '9999 999 999';
  vm.phoneMask = '9999 999 999';
  vm.regExpPhone = '^[1,0]\\d{9}$';
  vm.regExpMobilePrefix = '(^[1][38]00)|(^04)';
  vm.name = 'Ui Mask';
  vm.phone = '';
  vm.models = {
    makeRequired: false
  };

//   vm.updatePhoneMask = function () {
//     if (!vm.phone) {
//       return;
//     }

//     var re = new RegExp(vm.regExpMobilePrefix);

//     if (vm.phone.match(re)) {
//       vm.phoneMask = vm.mobileMask;
//     }
//     else {
//       vm.phoneMask = vm.defaultMask;
//     }
//   };

}]);

app.directive('customPlaceholder', [function () {
  return {
    scope: {
      phoneNumber: "="
    },
    link: function (scope, element, attr) {
      element.on('click', function () {
        if (!scope.phoneNumber) {
          attr.$set('uiMask', '9999 999 999');
          attr.$set('placeholder', '____ ___ ___');
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
          attr.$set('uiMask', '9999 999 999');
          attr.$set('placeholder', '04XX XXX XXX');
        }
      });


      function maskPhoneNumber() {
        var defaultMask = '(99) 9999 9999';
        var mobileMask = '9999 999 999';
        var regExpMobilePrefix = '(^[1][38]00)|(^04)';
        var regExpPhone = '^[1,0]\\d{9}$';
        var re = new RegExp(regExpMobilePrefix);

        if (scope.phoneNumber.match(re)) {
          attr.$set('uiMask', '9999 999 999');
          attr.$set('placeholder', '____ ___ ___');
        }
        else {
          attr.$set('uiMask', '(99) 9999 9999');
          attr.$set('placeholder', '(__) ____ ____');
        }
      }
    }
  }
}]);
