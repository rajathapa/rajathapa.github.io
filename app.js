var app = angular.module('myApp', ['ui.mask']);

app.controller('MainCtrl', ['$scope', function ($scope) {
  var vm = this;
  vm.name = 'Ui Mask';
  vm.phone = '';
  vm.defaultPlaceholder = '04xx xxx xxx';
  vm.regExpPhone = '^[1,0]\\d{9}$';
  vm.messageErrorPhone = 'Please enter your phone number starting with a 0 or 1';
// mimic refresh
  if (localStorage.phone != '') {
    vm.phone = localStorage.phone;
  }


  vm.updatePhone = function () {
    if (!vm.isValidPhone()) {
      return;
    }
    // save in localstorage for retrival
    localStorage.phone = vm.phone;
  };


  vm.isValidPhone = function () {
    if(vm.phone === null || angular.isUndefined(vm.phone) || vm.phone === ''){
            return false;
    }
    var phone = vm.phone;
    phone = phone.replace(/[()\-# ]/gi, '');

    var re = new RegExp(vm.regExpPhone);
    var result = re.test(phone);
    return result;
  };
}]);

app.directive('customPlaceholder', [function () {
  return {
    scope: {
      phoneNumber: "=",
      pholder: "="
    },
    link: function (scope, element, attr) {
      var landlineMask = '(99) 9999 9999';
      var mobileMask = '9999 999 999';

      var defaultMask = "9999999999";

      var regExpMobilePrefix = '(^[1][38]00)|(^04)';
      var re = new RegExp(regExpMobilePrefix);

      angular.element(document).ready(function () {
        if(scope.phoneNumber){
          maskPhoneNumber();
        }
      });

      element.on('focus', function () {
        if (!scope.phoneNumber) {
          attr.$set('uiMask', defaultMask);
          setPlaceholder(attr, defaultMask);
        }
      });

      element.on('keyup', function () {
        if (element.val().replace(" ", '').trim() === "( )" || 
          element.val().replace(" ", '').trim() === ""
        )
        {
          attr.$set('uiMask', defaultMask);
          setPlaceholder(attr, defaultMask);
        }
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
          attr.$set('uiMask', landlineMask);
          setPlaceholder(attr, landlineMask);
        }
      }

      function setPlaceholder(attr, value){
         var replacePattern = /[a-zA-Z0-9]/g;
         attr.$set('placeholder', value.replace(replacePattern, ' '));
      }
    }
  }
}]);