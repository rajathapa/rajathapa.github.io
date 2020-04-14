var app = angular.module('myApp', ['ui.mask']);

app.controller('MainCtrl',['$scope', function($scope) {
  var vm = this;
  vm.defaultMask =  '(99) 9999 9999';
  vm.mobileMask = '9999 999 999';
  vm.phoneMask = '9999 999 999';
  vm.regExpPhone =  '^[1,0]\\d{9}$';
  vm.regExpMobilePrefix =  '(^[1][38]00)|(^04)';
  vm.name = 'Ui Mask';
  vm.phone = '';
  vm.phone1 = '';
  vm.pholder = '99 9999 9999';
  vm.models = {
    makeRequired: false
  };

vm.updatePhoneMask = function () {
if (!vm.phone) {
    return;
}

var re = new RegExp(vm.regExpMobilePrefix);

if (vm.phone.match(re))
{
    vm.phoneMask = vm.mobileMask;
}
else
{
    vm.phoneMask = vm.defaultMask;
}
};
}]);

app.directive('customPlaceholder', [function () {
  return {
    scope: {
      pholder: "="
    },
    link: function (scope, element, attr) {
    //   angular.element(document).ready(function () {
    //     console.log(element);
    //     console.log(scope.pholder);
    //     //element.removeAttr('placeholder');
    //     //element.attr('placeholder', '04XX XXX XXX')

    //     if (!scope.pholder) {
    //       attr.$set('uiMask', '9999 999 999');
    //       attr.$set('placeholder', '04XX XXX XXX')
    //     }


    //  // element.addAttribute('placeholder', scope.pholder)
    //   });
//                 ui-mask="{{vm.phoneMask}}"
      element.on('click', function(){
        if (!scope.pholder) {
          attr.$set('uiMask', '9999 999 999');
          attr.$set('placeholder', '____ ___ ___');
        }
      });

    //  element.on('focusout', function(){
    //     if(!scope.pholder){
    //       attr.$set('uiMask', '9999 999 999');
    //       //scope.pholder = '9999 999 999';
    //       attr.$set('placeholder', '04XX XXX XXX');
    //     }
    //   });

    element.on('keyup', function(){
      if(!scope.pholder){
        return;
      };
      maskPhoneNumber();
    });



      element.on('focusout', function(){
        if(!scope.pholder){
          attr.$set('uiMask', '9999 999 999');
          // scope.pholder = '9999 999 999';
          attr.$set('placeholder', '04XX XXX XXX');
        }
        // else{
        //   maskPhoneNumber();
        // }
      });


  function maskPhoneNumber(){
    var defaultMask = '(99) 9999 9999';
    var mobileMask = '9999 999 999';
    var regExpMobilePrefix = '(^[1][38]00)|(^04)';
    var regExpPhone = '^[1,0]\\d{9}$';
    var re = new RegExp(regExpMobilePrefix);

    if (scope.pholder.match(re)) {
      //vm.phoneMask = mobileMask;
      attr.$set('uiMask', '9999 999 999');
      attr.$set('placeholder', '____ ___ ___');
      // scope.holder = '9999 999 999';
    }
    else {
      // vm.phoneMask = defaultMask;
      attr.$set('uiMask', '(99) 9999 9999');
      attr.$set('placeholder', '(__) ____ ____');
      // scope.pholder = '(99) 9999 9999';
    }
  }

}
  }
}]);
