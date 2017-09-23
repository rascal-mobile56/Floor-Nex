
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',  'plgn.ionic-segment', 'ngFileUpload', 'ngCordova'])

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

  .state('app.add-client', {
    url: '/add-client',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-client.html',
        controller: 'AddClientCtrl'
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

  .state('app.add-distributor', {
    url: '/add-distributor',
    views: {
      'menuContent': {
          templateUrl: 'templates/add-distributor.html',
          controller: 'AddDistributorCtrl'
        }
      }
  })

  .state('app.distributor-details', {
    url: '/distributor-details',
    views: {
      'menuContent': {
          templateUrl: 'templates/distributor-detail.html',
          controller: 'DistributorDetailsCtrl'
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

  .state('app.add-product', {
    url: '/add-product',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-product.html',
        controller: 'AddProductCtrl'
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

  .state('app.order-list', {
      url: '/order-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/order-list.html',
          controller: 'OrderListCtrl'
        }
      } 
    })

  .state('app.add-order', {
    url: '/add-order',
    views:{
      'menuContent':{
        templateUrl: 'templates/add-order.html',
        controller: 'AddOrderCtrl'
      }
    }
  })


  .state('app.add-item', {
    url: '/add-item',
    views:{
      'menuContent':{
        templateUrl: 'templates/add-item.html',
        controller: 'AddItemCtrl'
      }
    }
  })



  .state('app.order-details', {
    url: '/order-list/:clienId',
    views:{
      'menuContent':{
        templateUrl: 'templates/order-details.html',
        controller: 'OrderDetailsCtrl'
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
