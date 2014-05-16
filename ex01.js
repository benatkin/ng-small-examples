var example = angular.module('example', []);

example.directive('randomColor', function () {
  function randomHex() { return Math.floor(Math.random()*16).toString(16); }
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: '<span style="color: {{ color }}">{{ color }}</span>',
    link: function(scope, element, attrs) {
      scope.color = '#' + randomHex() + randomHex() + randomHex();
    }
  };
});

// based on Simple HTML Element Directive in
// https://docs.angularjs.org/guide/unit-testing

describe('test <random-color>', function() {
  var $compile, $rootScope;
  beforeEach(function() {
    module('example');
    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });
  
  it('should generate a color', function() {
    var el = $compile('<random-color></random-color>')($rootScope);
    $rootScope.$digest();
    expect(el.html()).toMatch(/^#[0-9a-f]{3}$/);
  });
  
  it('should generate different colors', function() {
    var el1 = $compile('<random-color></random-color>')($rootScope);
    var el2;
    // make same number appearing twice even less likely
    for (var i=0; i < 5; i++) {
      el2 = $compile('<random-color></random-color>')($rootScope);
      if (el1.html() !== el2.html()) break;
    }
    $rootScope.$digest();
    expect(el1.html()).not.toMatch(el2.html());
  });
});
