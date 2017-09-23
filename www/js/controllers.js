angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state) {

  $scope.doLogout = function(){
    console.log('logout');
    $state.go('login');
    localStorage.clear();
  }
})

.controller('LoginCtrl', function($scope, $state, $rootScope, $ionicLoading,  $cordovaDialogs, Server) {

  var loading = function() {
     $ionicLoading.show({
         template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
         '<br/><p>Processing...</p>'
     });
  }

  var token = localStorage.getItem('token');
  if(token){
    $state.go('app.home');
  } else{
    console.log('no login')
  }
  $scope.user = { email:'chang_hanok@protonmail.com', password: 'Aaaaaa123456'};
  // $scope.user = { email:'', password: ''};

  $scope.doLogin = function(){

    $ionicLoading.show();

    var user_email, password;
    user_email = $scope.user.email;
    user_password = $scope.user.password
    $scope.loginInfo = { "email": user_email, "password": user_password }

    console.log($scope.loginInfo);

    var method = "POST";
    var url =  $rootScope.apiServer + 'login';

    Server.httpDetails( method, url, $scope.loginInfo).then(function (response) {

         if(response.status == 200 ) {

           localStorage.setItem('data', JSON.stringify(response.data));
           $scope.detailData = localStorage.getItem('data');
           localStorage.setItem('token', response.data.token);
           console.log($scope.detailData);
           console.log(localStorage.getItem('token'));
           $ionicLoading.hide();
           $state.go('app.home');

         }else {
           $ionicLoading.hide();
            $cordovaDialogs.alert('Register Error.', 'Error!', 'OK');
            console.error(response);
         }
     }).catch(function(error) {
       $ionicLoading.hide();
        $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
        console.error(error);
     });
  }

})

.controller('SignupCtrl', function($scope, $state, $rootScope, $ionicLoading,  $cordovaDialogs, Server) {

    var loading = function() {
       $ionicLoading.show({
           template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
           '<br/><p>Processing...</p>'
       });
    }

    $scope.user = {username: '', email:'', password: ''};

    $scope.userlists = [
      { title: 'NEX-GEN employee', id: 0 },
      { title: 'Store Owner', id: 1 },
      { title: 'Manager', id: 2 },
      { title: 'Sales', id: 3 },
      { title: 'Distributor', id: 4 }
    ];
    $scope.store_id = "59b2e89a734d1d2c1613cf46";

    $scope.changedUserType = function(id){
        // console.log(id);
        $scope.selectedUser = $scope.userlists[id];
        console.log($scope.selectedUser.id);
    };

    $scope.doSignUp = function(){
      // $state.go('app.home');
        $ionicLoading.show();
        var username, user_email, user_type, store_id, password;
        username =  $scope.user.username;
        user_email = $scope.user.email;
        user_type = $scope.selectedUser.id;
        store_id = $scope.store_id;
        password = $scope.user.password;

        $scope.uploadData = { "username":$scope.user.username , "email":$scope.user.email, "type": $scope.selectedUser.id, store_id:$scope.store_id , "password":$scope.user.password };
        var method = "POST";
        var url =  $rootScope.apiServer + 'signup';

      console.log($scope.uploadData);
      Server.httpDetails( method, url, $scope.uploadData).then(function (response) {
           if(response.status == 200 ) {
              $ionicLoading.hide();
               $cordovaDialogs.alert('Registration is completed. Please wait until approval.', 'Alert!', 'OK');
               localStorage.setItem('data', JSON.stringify(response.data));
               localStorage.setItem('token', response.data.token);
               console.log('data', localStorage.getItem('data'));
               console.log('token', localStorage.getItem('token'));
               $state.go('app.home');
           }else {
              $ionicLoading.hide();
               $cordovaDialogs.alert('Register Error.', 'Error!', 'OK');
              console.error(error);
           }
       }).catch(function(error) {
         $ionicLoading.hide();
          $cordovaDialogs.alert('Sign up Error.', 'Error!', 'OK');
          console.error(error);
       });
     }

})

.controller('HomeCtrl', function($scope, $state,  $cordovaBarcodeScanner) {

  console.log('HomeCtrl');

  $scope.scanQR = function(){
    $cordovaBarcodeScanner.scan().then(function(barcodeData) {

        console.log(barcodeData);
        //  $state.go('app.productDetail', {key: barcodeData.text});

      }, function(error) {
        console.log(error);
      });
  }

})

.controller('ClientListCtrl', function($scope, $rootScope, $ionicLoading, Server) {


    $scope.$on("$ionicView.beforeEnter", function(event) {
        console.log('ClientListCtrl');
        $scope.getClientData();
    })

    var loading = function() {
         $ionicLoading.show({
             template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
             '<br/><p>Processing...</p>'
         });
      }

    $scope.getClientData = function(){

      $ionicLoading.show();

      var method = "GET";
      var url = $rootScope.apiServer + 'client?token=' + localStorage.getItem('token');
      var data = '';
      // console.log(method, url, data);

      Server.httpDetails( method, url, data).then(function (response) {
           if(response.status == 200 ) {
              $ionicLoading.hide();
             console.log(response.data);
             $scope.clientsList = response.data;
           }else {
              $ionicLoading.hide();
               $cordovaDialogs.alert('Register Error.', 'Error!', 'OK');
              console.error(error);
           }
       });
    }


    $scope.$on("$ionicNavView.beforeLeave", function(event) {
      $scope.getClientData();
    })

    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500,
    }

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      // note: the indexes are 0-based
      $scope.activeIndex = data.slider.activeIndex;
      $scope.previousIndex = data.slider.previousIndex;
    });

})


.controller('AddClientCtrl', function($scope, $rootScope, $ionicLoading, $ionicNavBarDelegate, Server) {

  var loading = function() {
     $ionicLoading.show({
         template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
         '<br/><p>Processing...</p>'
     });
  }

  $scope.client = { name:'minoru', phone:'123456789', email:'minorumadamr@hotmail.com', password:'123456', address:'japan', is_same:'', projects:[]};

  $scope.projectlists = [
    { name: 'Bedroom', value:0 },
    { name: 'Kitchen', value: 1 },
    { name: 'Bath', value: 2 },
    { name: 'Living', value: 3 },
    { name: 'Entrance', value: 4 },
    { name: 'Atrium', value: 5 },
    { name: 'Garden', value: 6 },
    { name: 'Other', value: 7 }
  ];

  $scope.changedProject = function(value, index){
      $scope.selectedproject = $scope.projectlists[value];
      $scope.client.projects[index] = value.name;
  };

  $scope.addProject = function() {
    $scope.client.projects.push('a');
  }

  $scope.addClient = function (){

    $ionicLoading.show();

      var token =  localStorage.getItem('token');
      console.log(token);
      var clientProjects = '';
      $scope.client.projects.map((item, index)=> {
        if(index == 0) {
          clientProjects = item;
        } else {
          clientProjects +=',' + item;
        }
      })
      $scope.clientInfo = { "token":token, "name":$scope.client.name, "client_email": $scope.client.email,
                            "phone": $scope.client.phone, "password":$scope.client.password, "address": $scope.client.address,
                            "projects": clientProjects }
      var url = $rootScope.apiServer + 'client';
      var method = "POST";
      console.log(token, $scope.clientInfo, url, method);
      Server.httpDetails( method, url, $scope.clientInfo).then(function (response) {
           if(response.status == 200 ) {
              $ionicLoading.hide();
             console.log(response.data);
             $ionicNavBarDelegate.back();
           }else {

              $cordovaDialogs.alert('Register Error.', 'Error!', 'OK');
              console.error(error);
              $ionicLoading.hide();
           }
       });
     }

})

.controller('ClientDetailsCtrl', function($scope, $stateParams, Chats, $rootScope) {

  console.log('ClientDetailsCtrl');

})


.controller('ClientProductCtrl', function($scope) {

  console.log('ClientProductCtrl');

})

.controller('AddProductCtrl', function($scope) {

  console.log('AddProductCtrl');

})

.controller('ClientProjectCtrl', function($scope) {

  console.log('ClientProjectCtrl');

})

.controller('DistributorListCtrl', function($scope, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

  console.log('DistributorListCtrl');

  var loading = function() {
     $ionicLoading.show({
         template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
         '<br/><p>Processing...</p>'
     });
  }

  $scope.$on("$ionicView.beforeEnter", function(event) {
      console.log('ClientListCtrl');
      $scope.getDistributorData();
  })

  $scope.getDistributorData = function (){
    $ionicLoading.show();
    console.log('DistributorsCtrl');
    var token =  localStorage.getItem('token');
    var method = "GET";
    var url = $rootScope.apiServer + 'distributor?token=' + token;

    Server.httpDetails( method, url, '').then(function (response) {

      $ionicLoading.hide();

       if(response.status == 200 ) {

         console.log('distributorData',response.data);
         $scope.distributorlist = response.data;
       }else {

           $cordovaDialogs.alert('Get Error.', 'Error!', 'OK');
          console.error(error);
       }
     }).catch(function(error) {
       $ionicLoading.hide();
        $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
        console.error(error);
     });
   }

})

.controller('AddDistributorCtrl', function($scope, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

  console.log('Add DistributorCtrl');

    var loading = function() {
       $ionicLoading.show({
           template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
           '<br/><p>Processing...</p>'
       });
    }

    var token = localStorage.getItem('token')
    $scope.distributor = { token: token, name:'', phone: '', distributor_email:'', password:'',
                    address:'', city:'', state:'', zip:'', by_store: false,
                    by_manufacturer: false };

    $scope.addDistributor = function(){

      $ionicLoading.show();
      console.log($scope.distributor);

      var url = $rootScope.apiServer + 'distributor';
      var method = "POST";
      Server.httpDetails( method, url, $scope.distributor).then(function (response) {
        $ionicLoading.hide();
           if(response.status == 200 ) {
             console.log('res', response.data);
            //  $ionicNavBarDelegate.back();
           }else {
              $cordovaDialogs.alert('Register Error.', 'Error!', 'OK');
              console.error(error);
           }
       }).catch(function(error) {
         $ionicLoading.hide();
          $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
          console.error(error);
       });
    }

})

.controller('DistributorDetailsCtrl', function($scope) {

  console.log('DistributorDetailsCtrl');

})

.controller('DisEmployeesCtrl', function($scope) {

  console.log('DisEmployeesCtrl ');

})

.controller('ProductListCtrl', function($scope, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

  $scope.$on("$ionicView.beforeEnter", function(event) {
      console.log('ProductListCtrl');
      $scope.getProductData();
  })

    var loading = function() {
       $ionicLoading.show({
           template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
           '<br/><p>Processing...</p>'
       });
    }

    $scope.getProductData = function (){
      $ionicLoading.show();
      var token =  localStorage.getItem('token');
      var method = "GET";
      var url = $rootScope.apiServer + 'product?token=' + token;

      Server.httpDetails( method, url, '').then(function (response) {

        $ionicLoading.hide();

         if(response.status == 200 ) {

           console.log('productData',response.data);
           $scope.productData = response.data;
         }else {

             $cordovaDialogs.alert('Get Error.', 'Error!', 'OK');
            console.error(error);
         }
       }).catch(function(error) {
         $ionicLoading.hide();
          $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
          console.error(error);
       });
     }

    $scope.showOptions = false;
    console.log('ProductsCtrl');

    $scope.showFilterOptions = function(){
      console.log($scope.showOptions);
      $scope.showOptions = !$scope.showOptions;
    }

})

.controller('AddProductCtrl', function($scope, $stateParams, $rootScope, $ionicLoading, $ionicActionSheet) {

  console.log('AddProductCtrl');

  var loading = function() {
     $ionicLoading.show({
         template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
         '<br/><p>Processing...</p>'
     });
  }

  var token = localStorage.getItem('token');

  $scope.product = { token:token , name:'', distributor:'', phone:'', materials:'', projects: '',
                  available: false, cost_per_unit:'', unit:'', mark_up_percent:'', length:'', width:'', coverage_area:'', costper:'',
                  min_shipping_cost:'', flat_fee:'', shipping_min:'', shipping_max:''};

  $scope.materiallists = [

    { name: 'Wood', value:0 },
    { name: 'Marble', value: 1 },
    { name: 'Tile', value: 2 },
    { name: 'Ceramic', value: 3 },
    { name: 'Grantie', value: 4 },
    { name: 'Contret', value: 5 },
    { name: 'Other', value: 6 }
  ];

  $scope.changedMaterial = function(value){
      $scope.product.materials = value.value;
      console.log('selectedmaterial', $scope.product.materials);
    };

  $scope.projectlists = [
    { name: 'Bedroom', value:0 },
    { name: 'Kitchen', value: 1 },
    { name: 'Bath', value: 2 },
    { name: 'Living', value: 3 },
    { name: 'Entrance', value: 4 },
    { name: 'Atrium', value: 5 },
    { name: 'Garden', value: 6 },
    { name: 'Other', value: 7 }
  ];

  $scope.changedProject = function(value){
      $scope.product.projects = value.value;
      console.log('selectedproject', $scope.product.projects);
  };

  $scope.costlists = [
    { name: 'SQ.FT.', value:0 },
    { name: 'SQ.INCH', value: 1 },
    { name: 'BUNDLE', value: 2 },
    { name: 'YARD', value: 3 }
    ];

  $scope.changedCostPer = function(value){
      $scope.product.cost_per_unit = value.vaue;
      console.log('selectedcost', $scope.product.costper);
  }

  // var option1 = {
  //     quality: 75,
  //     destinationType: Camera.DestinationType.DATA_URL,
  //     sourceType: Camera.PictureSourceType.CAMERA,
  //     allowEdit: true,
  //     encodingType: Camera.EncodingType.JPEG,
  //     targetWidth: 150,
  //     targetHeight: 150,
  //     popoverOptions: CameraPopoverOptions,
  //     saveToPhotoAlbum: false
  // }
  //
  // var option2 = {
  //     quality: 75,
  //     destinationType: Camera.DestinationType.DATA_URL,
  //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: Camera.EncodingType.JPEG,
  //     targetWidth: 150,
  //     targetHeight: 150,
  //     popoverOptions: CameraPopoverOptions,
  //     saveToPhotoAlbum: false
  // }
  //
  //
  // $scope.addPhoto = function() {
  //   $ionicActionSheet.show({
  //     titleText: 'Select Photo',
  //     buttons: [
  //       { text: '<i class="icon ion-ios-camera-outline"></i> Camera' },
  //       { text: '<i class="icon ion-images"></i> Photo Library' },
  //     ],
  //     cancelText: 'Cancel',
  //     cancel: function() {
  //       console.log('CANCELLED');
  //     },
  //     buttonClicked: function(index) {
  //       if(index === 0) {
  //             console.log(index);
  //             $scope.photo();
  //           }
  //       if(index === 1) {
  //          console.log(index);
  //          $scope.camera();
  //       }
  //       return true;
  //     }
  //   });
  //  }
  //
  //  $scope.photo = function(){
  //    $cordovaCamera.getPicture(option1).then(function(imageData) {
  //     var src = "data:image/jpeg;base64," + imageData;
  //     console.log(src);
  //     $scope.uploadtoS3(src);
  //   }, function(err) {
  //     console.log(err);
  //   });
  //  }
  //  $scope.camera = function() {
  //    $cordovaCamera.getPicture(option2).then(function(imageData) {
  //     var src = "data:image/jpeg;base64," + imageData;
  //     $scope.imagePath = src
  //     console.log(src);
  //     $scope.uploadtoS3(src);
  //   }, function(err) {
  //     console.log(err);
  //   });
  //  }
  //
  //  $scope.uploadFile = function(file){
  //
  //    console.log('uploadFile');
  //
  //    $ionicLoading.show();
  //
  //    var inputConfig = {
  //       bucket: 'floormanager',
  //       access_key: 'AKIAJ5BFV6ZBGGDDO4LA',
  //       secret_key: '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'
  //     };
  //
  //     AWS.config.update({ accessKeyId: inputConfig.access_key, secretAccessKey: inputConfig.secret_key });
  //     AWS.config.region = 'us-west-2';
  //     var bucket = new AWS.S3({ params: { Bucket: inputConfig.bucket } });
  //
  //     var filename = new Date().getTime() + file.name;
  //
  //     var params = {
  //       Key: filename,
  //       ContentType: file.type,
  //       Body: file,
  //       ACL: 'public-read',
  //       ServerSideEncryption: 'AES256'
  //     };
  //
  //     bucket.putObject(params, function (err, data) {
  //
  //       $ionicLoading.hide();
  //       console.log(data);
  //
  //       if (err) {
  //         console.log('error',err);
  //       } else {
  //         var object = {
  //           url: 'https://s3-us-west-2.amazonaws.com/floormanager/' + filename
  //         };
  //         console.log('object',object);
  //       }
  //     });
  //
  //   }

    $scope.addDistributor = function(){

      $ionicLoading.show();
      console.log($scope.distributor);

      var url = $rootScope.apiServer + 'product';
      var method = "POST";
      Server.httpDetails( method, url, $scope.product).then(function (response) {
        $ionicLoading.hide();
           if(response.status == 200 ) {
             console.log('res', response.data);
            //  $ionicNavBarDelegate.back();
           }else {
              $cordovaDialogs.alert('Register Error.', 'Error!', 'OK');
              console.error(error);
           }
       }).catch(function(error) {
         $ionicLoading.hide();
          $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
          console.error(error);
       });
    }





})

.controller('StoreListCtrl', function($scope, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

  console.log('StoreListCtrl');

  $scope.$on("$ionicView.beforeEnter", function(event) {
      console.log('ProductListCtrl');
      $scope.getStoreData();
  })

  var loading = function() {
     $ionicLoading.show({
         template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
         '<br/><p>Processing...</p>'
     });
  }

  $scope.getStoreData = function (){
    $ionicLoading.show();
    var token =  localStorage.getItem('token');
    var method = "GET";
    var url = $rootScope.apiServer + 'store?token=' + token;

    Server.httpDetails( method, url, '').then(function (response) {

      $ionicLoading.hide();

       if(response.status == 200 ) {

         console.log('storeData',response.data);
         $scope.storeData = response.data;
       }else {

           $cordovaDialogs.alert('Get Error.', 'Error!', 'OK');
          console.error(error);
       }
     }).catch(function(error) {
       $ionicLoading.hide();
        $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
        console.error(error);
     });
   }


})

.controller('OrderListCtrl', function($scope, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

  $scope.orderlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.images = [
    { url: 'img/gHd5vedGQJu4s4qsPQvr_kitten2.jpg', id: 1 },
    { url: 'img/avfsZwJT9WGsBj982ul1_kitten1.jpg', id: 2 },
    { url: 'img/WE6rB9dZRTiIWQlP5qsA_kitten3.jpg', id: 3 }
  ];

  console.log('OrderListCtrl');

  $scope.$on("$ionicView.beforeEnter", function(event) {
      console.log('ProductListCtrl');
      $scope.getOrderData();
  })

  var loading = function() {
     $ionicLoading.show({
         template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
         '<br/><p>Processing...</p>'
     });
  }

  $scope.getOrderData = function (){
    $ionicLoading.show();
    var token =  localStorage.getItem('token');
    var method = "GET";
    var url = $rootScope.apiServer + 'order?token=' + token;

    Server.httpDetails( method, url, '').then(function (response) {

      $ionicLoading.hide();

       if(response.status == 200 ) {

         console.log('orderData',response.data);
         $scope.orderData = response.data;
       }else {

           $cordovaDialogs.alert('Get Error.', 'Error!', 'OK');
          console.error(error);
       }
     }).catch(function(error) {
       $ionicLoading.hide();
        $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
        console.error(error);
     });
   }

})

.controller('AddOrderCtrl', function($scope, $state, $stateParams) {

  console.log('AddOrderCtrl');

  $scope.order = { token:'', customer_id: "0", product_id:'', date:'', due_date: '', discount:'',
                    sales_tax:'', shipping_fee:'', message:'', memo:'' }

  $scope.customerlists = [
    { name: 'Abid', value: 0 },
    { name: 'Andy Mallor', vlaue: 1},
    { name: 'Armando Rodriguez', value: 3},
    { name: 'Bob Show', value: 4 },
    { name: ' Dahan Victor', value: 5 }
  ];

  $scope.changedCustomer = function(value){
      $scope.order.customer_id = value.value;
      console.log('selectedcustomer', $scope.order.customer_id);
  };

  $scope.productlists = [
    { name: 'Bedroom', value:0 },
    { name: 'Kitchen', value: 1 },
    { name: 'Bath', value: 2 },
    { name: 'Living', value: 3 },
    { name: 'Entrance', value: 4 },
    { name: 'Atrium', value: 5 },
    { name: 'Garden', value: 6 },
    { name: 'Other', value: 7 }
  ];

  $scope.changedProduct = function(value){
      $scope.order.products = value.value;
      console.log('selectedproject', $scope.order.products);
  };

  // $scope.changedProject = function(value, index){
  //     $scope.selectedproject = $scope.projectlists[value];
  //     $scope.order.projects[index] = value.name;
  // };

  $scope.addProject = function() {
    $scope.order.projects.push('a');
  }

  $scope.addItem = function() {

    $state.go('app.add-item', {bb: 'a'});
  }





})

.controller('AddItemCtrl', function($scope, $stateParams) {
  console.log('AddItemCtrl');
  $scope.padding = { checked: false};
  $scope.tack = { checked: false};
  $scope.glue = { checked: false};
  $scope.labor = { checked: false};
  $scope.transition = { checked: false};

  $scope.$on('$ionicView.afterEnter', function(event) {
      console.log('aa', $stateParams);
  })

  // console.log('aa', $stateParams.aa);


  $scope.paddingChange = function() {
   console.log('Padding Change', $scope.padding.checked);
 };

 $scope.tackChange = function() {
  console.log('Tack Change', $scope.tack.checked);
  };

  $scope.glueChange = function() {
   console.log('Glue Change', $scope.glue.checked);
  };


  $scope.laborChange = function() {
   console.log('Labor Change', $scope.labor.checked);
  };

  $scope.transitionChange = function() {
   console.log('transition Change', $scope.transition.checked);
  };

  $scope.goBack = function(){}



})

.controller('OrderDetailsCtrl', function($scope) {

  console.log('AddOrderCtrl');

})

.controller('ControlPanelCtrl', function($scope) {

  console.log('ControlPanelCtrl');

})

.controller('SettingCtrl', function($scope) {

  console.log('SettingCtrl');

})
