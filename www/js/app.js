
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',  'plgn.ionic-segment', 'ngFileUpload', 'monospaced.qrcode', 'ngCordova'])

.run(function($ionicPlatform,  $rootScope) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.apiServer = "https://immense-gorge-23346.herokuapp.com/api/";
})

.factory('_', ['$window', function($window) {
    return $window._;
}])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false);
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.client-list', {
    url: '/client-list',
    views: {
      'menuContent': {
        templateUrl: 'templates/client-list.html',
        controller: 'ClientListCtrl'
      }
    }
  })

  .state('app.client-add', {
    url: '/client-add',
    views: {
      'menuContent': {
        templateUrl: 'templates/client-add.html',
        controller: 'ClientAddCtrl'
      }
    }
  })

  .state('app.client-details', {
    url: '/client-list/:clienId',
    views: {
      'menuContent': {
        templateUrl: 'templates/client-detail.html',
        controller: 'ClientDetailsCtrl'
      }
    }
  })

  .state('app.client-product', {
    url: '/client-product',
    views: {
      'menuContent': {
        templateUrl: 'templates/client-product.html',
        controller: 'ClientProductCtrl'
      }
    }
  })

  .state('app.client-project', {
    url: '/client-project',
    views: {
      'menuContent': {
        templateUrl: 'templates/client-project.html',
        controller: 'ClientProjectCtrl'
      }
    }
  })

  .state('app.distributor-list', {
      url: '/distributor-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/distributor-list.html',
          controller: 'DistributorListCtrl'
        }
      }
    })

  .state('app.distributor-add', {
    url: '/distributor-add',
    views: {
      'menuContent': {
          templateUrl: 'templates/distributor-add.html',
          controller: 'DistributorAddCtrl'
        }
      }
  })

  .state('app.distributor-detail', {
    url: '/distributor-detail',
    params: {
      item: {}
    },
    views: {
      'menuContent': {
          templateUrl: 'templates/distributor-detail.html',
          controller: 'DistributorDetailCtrl'
        }
      }
  })

  .state('app.dis_employees', {
    url: "/dis_employees",
    views: {
      'menuContent': {
        templateUrl: "templates/dis_employees.html",
        controller: 'DisEmployeesCtrl'
      }
    }
  })

  .state('app.product-list', {
      url: '/product-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/product-list.html',
          controller: 'ProductListCtrl'
        }
      }
    })

  .state('app.product-add', {
    url: '/product-add',
    views: {
      'menuContent': {
        templateUrl: 'templates/product-add.html',
        controller: 'ProductAddCtrl'
      }
    }
  })
  .state('app.product-detail', {
    url: '/product-detail',
    params: {
      item: {}
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/product-detail.html',
        controller: 'ProductDetailCtrl'
      }
    }
  })

  .state('app.product-edit', {
    url: '/product-edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/product-edit.html',
        controller: 'ProductEditCtrl'
      }
    }
  })

  .state('app.store-list', {
      url: '/store-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/store-list.html',
          controller: 'StoreListCtrl'
        }
      }
    })

  .state('app.store-add', {
      url: '/store-add',
      views: {
        'menuContent': {
          templateUrl: 'templates/store-add.html',
          controller: 'StoreAddCtrl'
        }
      }
    })

    .state('app.store-detail', {
        url: '/store-detail',
        views: {
          'menuContent': {
            templateUrl: 'templates/store-detail.html',
            controller: 'StoreDetailCtrl'
          }
        }
      })

  .state('app.order-list', {
      url: '/order-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/order-list.html',
          controller: 'OrderListCtrl'
        }
      } 
    })

  .state('app.order-add', {
    url: '/order-add',
    views:{
      'menuContent':{
        templateUrl: 'templates/order-add.html',
        controller: 'OrderAddCtrl'
      }
    }
  })


  .state('app.add-item', {
    url: '/add-item',
    params: {
      bb: ""
    },
    views:{
      'menuContent':{
        templateUrl: 'templates/add-item.html',
        controller: 'AddItemCtrl'
      }
    }
  })

  .state('app.order-detail', {
    url: '/order-list/:clienId',
    params: {
      item: {}
    },
    views:{
      'menuContent':{
        templateUrl: 'templates/order-detail.html',
        controller: 'OrderDetailCtrl'
      }
    }
  })

  .state('app.control-panel', {
      url: '/control-panel',
      views: {
        'menuContent': {
          templateUrl: 'templates/control-panel.html',
          controller: 'ControlPanelCtrl'
        }
      }
    })

  .state('app.setting', {
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/setting.html',
          controller: 'SettingCtrl'
        }
      }
    })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
