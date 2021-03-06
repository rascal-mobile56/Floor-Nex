angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state) {

  $scope.doLogout = function(){
    console.log('logout');
    $state.go('login');
    localStorage.clear();
  }


})

.controller('LoginCtrl', function($scope, $state, $rootScope, $ionicLoading,  $cordovaDialogs, Server) {

$scope.detailData={};
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
  $scope.user = { email:'chang_hanok@protonmail.com', password: '123456'};
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

           localStorage.setItem('data', response.data);
           $scope.detailData = localStorage.getItem('data');
           localStorage.setItem('token', response.data.token);
           localStorage.setItem('type', response.data.type);
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
                { title: "Store Owner", id: 0 },
                { title: "Client", id: 1 },
                { title: "Store Sales", id: 2 },
                { title: "Distributor", id: 3 },
                { title: "Store Manager", id: 4 },
                { title: "NEX-GEN Employees", id: 5 },
                // { title: "Contractor", value: 6 }
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
               localStorage.setItem('data', response.data);
               localStorage.setItem('token', response.data.token);
               localStorage.setItme('type', response.data.type);
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

.controller('HomeCtrl', function($scope, $state, $rootScope, $cordovaBarcodeScanner) {

  console.log('HomeCtrl');

  $scope.$on("$ionicView.beforeEnter", function(event) {
      console.log('ClientListCtrl');
      $scope.profileType();

  })

  $scope.profileType = function(){
    console.log('profileData',localStorage.getItem('data'))
    $rootScope.user_type = localStorage.getItem('type');
    console.log('type', $rootScope.user_type);
  }

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


.controller('ClientAddCtrl', function($scope, $rootScope, $ionicLoading, $ionicNavBarDelegate, Server) {

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

.controller('ProductAddCtrl', function($scope) {

  console.log('ProductAddCtrl');

})

.controller('ClientProjectCtrl', function($scope) {

  console.log('ClientProjectCtrl');

})

.controller('DistributorListCtrl', function($scope, $state, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

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
   $scope.viewDistributorDetail = function(item){
     $state.go('app.distributor-detail', {item: item});
   }
})

.controller('DistributorAddCtrl', function($scope, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

  console.log('DistributorAddCtrl');

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

.controller('DistributorDetailCtrl', function($scope, $stateParams) {

  console.log('DistributorDetailCtrl');

  var distributor = $stateParams.item;
  $scope.distributor = distributor;
  console.log(distributor);

})

.controller('DisEmployeesCtrl', function($scope) {

  console.log('DisEmployeesCtrl ');

})


//Product Details Page

.controller('ProductListCtrl', function($scope, $state, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {

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

    $scope.viewProductDetail = function(item){
      console.log('item', item);
      $state.go('app.product-detail', {item: item});
    }

})

.controller('ProductDetailCtrl', function($scope, $state, $rootScope, $cordovaDialogs, $ionicLoading, $stateParams, Server) {

  console.log('ProductDetailCtrl');

  $scope.materiallists = [

    { name: 'Wood', value:0 },
    { name: 'Marble', value: 1 },
    { name: 'Tile', value: 2 },
    { name: 'Ceramic', value: 3 },
    { name: 'Grantie', value: 4 },
    { name: 'Contret', value: 5 },
    { name: 'Other', value: 6 }
  ];

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

  $scope.$on("$ionicView.beforeEnter", function(event) {
      console.log('ProductListCtrl');
      $scope.getDistributorData();
  });

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

         var distributor = $scope.distributorlist;

         for(var i=0; i<distributor.length; i++){
           if(distributor[i].distributor_email == $scope.product.distributor_email){
             $scope.distributor = distributor[i];
             console.log($scope.distributor);
           }
         }
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

  $scope.product = $stateParams.item;
  console.log('productData', $scope.product);

  for(var i=0; i<$scope.materiallists.length; i++){
    if($scope.materiallists[i].value == $scope.product.material){
      $scope.material = $scope.materiallists[i].name;
      console.log($scope.material);
    }
  }

  for(var i=0; i<$scope.projectlists.length; i++){
    if($scope.projectlists[i].value == $scope.product.project){
      $scope.project = $scope.projectlists[i].name;
      console.log($scope.project);
    }
  }

  var price =($scope.product.cost * 1) + ($scope.product.cost * 1) * ($scope.product.mark_up_percent * 1) / 100;
  $scope.price = price.toFixed(2)

  $scope.editProduct = function(){
    $state.go('app.product-edit');
  }

})

.controller('ProductAddCtrl', function($scope, $stateParams, $rootScope, $ionicLoading, $ionicActionSheet, $cordovaCamera, Server) {

  console.log('ProductAddCtrl');

  var loading = function() {
     $ionicLoading.show({
         template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
         '<br/><p>Processing...</p>'
     });
  }

  var token = localStorage.getItem('token');

  $scope.product = { token:token , name:'', distributor_email:'minorumadamr@hotmail.com', distributor_name:'test', materials:'', projects: '', available: false,
                      cost:'', unit:'', mark_up_percent:50, length:'', width:'', area:'',
                      min_shipping_cost:'', flat_fee:'', price:'', image:''};
  $scope.available = { checked: true };

  $scope.other = {shipping_max:'', shipping_min:''}

  $scope.materiallists = [

    { name: 'Wood', value:0 },
    { name: 'Marble', value: 1 },
    { name: 'Tile', value: 2 },
    { name: 'Ceramic', value: 3 },
    { name: 'Grantie', value: 4 },
    { name: 'Contret', value: 5 },
    { name: 'Other', value: 6 }
  ];

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

  $scope.costlists = [
    { name: 'SQ.FT.', value:0 },
    { name: 'SQ.INCH', value: 1 },
    { name: 'BUNDLE', value: 2 },
    { name: 'YARD', value: 3 }
  ];

  $scope.changedMaterial = function(value){
      $scope.product.materials = value.value;
      console.log('selectedmaterial', $scope.product.materials);
    };

  $scope.changedProject = function(value){
      $scope.product.projects = value.value;
      console.log('selectedproject', $scope.product.projects);
  };

  $scope.changedCostPer = function(value){
      console.log(value);
      $scope.product.unit = value.value;
      console.log('selectedcost', $scope.product.unit);
  }

  $scope.availableChange = function() {
    $scope.product.available = $scope.available.checked;
   console.log('available Change', $scope.product.available);
  };



  var option1 = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 150,
      targetHeight: 150,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  }

  var option2 = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 150,
      targetHeight: 150,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  }


  $scope.addPhoto = function() {
    $ionicActionSheet.show({
      titleText: 'Select Photo',
      buttons: [
        { text: '<i class="icon ion-ios-camera-outline"></i> Camera' },
        { text: '<i class="icon ion-images"></i> Photo Library' },
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        if(index === 0) {
              console.log(index);
              $scope.photo();
            }
        if(index === 1) {
           console.log(index);
           $scope.camera();
        }
        return true;
      }
    });
   }

   $scope.photo = function(){
     $cordovaCamera.getPicture(option1).then(function(imageData) {
      var src = "data:image/jpeg;base64," + imageData;
      console.log(src);
      $scope.uploadtoS3(src);
    }, function(err) {
      console.log(err);
    });
   }
   $scope.camera = function() {
     $cordovaCamera.getPicture(option2).then(function(imageData) {
      var src = "data:image/jpeg;base64," + imageData;
      $scope.imagePath = src
      console.log(src);
      $scope.uploadtoS3(src);
    }, function(err) {
      console.log(err);
    });
   }

   $scope.uploadFile = function(file){

     console.log('uploadFile');

     $ionicLoading.show();

     var inputConfig = {
        bucket: 'floormanager',
        access_key: 'AKIAJ5BFV6ZBGGDDO4LA',
        secret_key: '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'
      };

      AWS.config.update({ accessKeyId: inputConfig.access_key, secretAccessKey: inputConfig.secret_key });
      AWS.config.region = 'us-west-2';
      var bucket = new AWS.S3({ params: { Bucket: inputConfig.bucket } });

      var filename = new Date().getTime() + file.name;

      var params = {
        Key: filename,
        ContentType: file.type,
        Body: file,
        ACL: 'public-read',
        ServerSideEncryption: 'AES256'
      };

      bucket.putObject(params, function (err, data) {

        $ionicLoading.hide();
        console.log(data);

        if (err) {
          console.log('error',err);
        } else {
          var object = {
            url: 'https://s3-us-west-2.amazonaws.com/floormanager/' + filename
          };

          $scope.product.image =  object.url;
          console.log('image',$scope.product.image);
        }
      }).catch(function(error) {
        $ionicLoading.hide();
         $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
         console.error(error);
      });

    }

    $scope.addProduct = function(){

      $ionicLoading.show();
      console.log($scope.product);

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
       });
    }
})



.controller('ProductEditCtrl', function($scope) {

  console.log('ProductEditCtrl');

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

.controller('StoreAddCtrl', function($scope) {

  console.log('StoreAddCtrl');

})

.controller('StoreEditCtrl', function($scope) {

  console.log('StoreEditCtrl');

})

.controller('OrderListCtrl', function($scope, $state, $rootScope, $ionicLoading ,$cordovaDialogs, Server) {


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

   $scope.viewOrderDetail = function(item){
     $state.go('app.order-detail', {item: item});
   }

})

.controller('OrderAddCtrl', function($scope, $state, $stateParams, $ionicLoading, $cordovaDialogs, $ionicHistory, $rootScope, _, Server) {
    console.log('OrderAddCtrl');

    $scope.$on("$ionicView.beforeEnter", function(event) {
        console.log('ProductListCtrl');
        $scope.getProductData();
    })

    $scope.getProductData = function (){
      $ionicLoading.show();
      var token =  localStorage.getItem('token');
      var method = "GET";
      var url = $rootScope.apiServer + 'product?token=' + token;

      Server.httpDetails( method, url, '').then(function (response) {

        $ionicLoading.hide();

         if(response.status == 200 ) {

           console.log('productlists',response.data);
           $scope.productlists = response.data;

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


    var loading = function() {
       $ionicLoading.show({
           template: '<ion-spinner style="fill: #fff" icon="bubbles"></ion-spinner>' +
           '<br/><p>Processing...</p>'
       });
    }

    var token = localStorage.getItem('token');

    $scope.addorder = {duedate:'', date:''}

    var formatDate = function(date) {
        var retVal = '';
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        retVal = [year, month, day].join('-');
        console.log(retVal);

        return retVal;
    }

    // $scope.products = [{id:'', cost:0, count:0, total:0}];

    // $scope.order = { token:token, customer_id: "0", product_id:'', date:'', due_date: '', message:'', memo:'' }

    $scope.order = {token: token, customer_id: '0', date:'', due_date:'', total_price:0, discount:0, shipping_fee: 0, sales_tax:0, message:'', momo:'', products : [{id:'', cost:0, count:0, total:0}] }

    $scope.items = [{id:0, title: "Sales Tax", model:0, modeltitle:"sales_tax", show: true}, {id:1, title: "Discount", model:0, modeltitle:"discount", show: true},
                  {id:2, title: "Shipping Fee", model:0, modeltitle:"shipping_fee", show: true}];


    $rootScope.newitems = [{id:3, title: "Padding", model:0, modeltitle:"padding", show: false}, {id:4, title: "Tack Strip", model:0, modeltitle:"tack_strip", show: false},
                  {id:5, title: "Glue", model:0, modeltitle:"glue", show: false}, {id:6, title: "Labor", model:0, modeltitle:"labor", show: false},
                  {id:7, title: "Transition Strips", model:0, modeltitle:"transition_strips", show: false}];

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

    $scope.changedProduct = function(value, index){
        
        $scope.order.products[index].id = value._id;
        $scope.order.products[index].cost = parseFloat(value.cost);
        $scope.onPriceChange();
    };

    $scope.onPriceChange = function() {
      // console.log("onPriceChange");
      $scope.order.total_price = 0;
      // $scope.order.total_price = $scope.order.count * $scope.product.cost;
      $scope.order.products.map((product)=> {
        $scope.order.total_price += product.count*product.cost;
      });
      $scope.items.map((item)=> {
        if(item.model && item.id !=0) {
          $scope.order.total_price+=item.model;
        }
      });

      $rootScope.newitems.map((item)=> {
        if(item.model) {
          $scope.order.total_price+=item.model;
        }
      });

      if($scope.items[0].model) {
        $scope.order.total_price = $scope.order.total_price + $scope.order.total_price*$scope.items[0].model/100;
      }
    }



    $scope.addProduct = function() {
      // $scope.order.projects.push('a');
      let newProduct = {id:'', cost:0, count:0, total:0};
      $scope.order.products = $scope.order.products.concat(newProduct);
      
    }

    $scope.addItem = function() {

      $state.go('app.add-item', {bb: 'a'});
    }

    

    $scope.saveOrder = function() {
      $scope.order.date = formatDate($scope.addorder.date);
      $scope.order.due_date = formatDate($scope.addorder.duedate);

      var newOrder = _.clone($scope.order);
      $scope.items.map((item)=> {
        if(item.model) {
          newOrder[item.modeltitle] = item.model;
        }
      });

      $rootScope.newitems.map((item)=> {
        if(item.model) {
          newOrder[item.modeltitle] = item.model;
        }
      });

      console.log("neworder", newOrder);


      // $ionicLoading.show();
      // var url = $rootScope.apiServer + 'order';
      // var method = "POST";
      // Server.httpDetails( method, url, newOrder).then(function (response) {
      //   $ionicLoading.hide();
      //      if(response.status == 200 ) {
      //        console.log('Addorder Res1111', response.data);
      //        $scope.goBack();
      //      }else {
      //         $cordovaDialogs.alert('Register Error.', 'Error!', 'OK');
      //         console.error(error);
      //      }
      //  }).catch(function(error) {
      //    $ionicLoading.hide();
      //     $cordovaDialogs.alert('Server Error.', 'Error!', 'OK');
      //     console.error(error);
      //  });
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
})

.controller('AddItemCtrl', function($scope, $stateParams, $ionicHistory) {
  console.log('aa', $stateParams);

 $scope.onItemChange = function(item) {
   if(!item.show) {
     item.model = '';
   }
 }
 $scope.goBack = function(){
   $ionicHistory.goBack();
 }

})

.controller('OrderDetailCtrl', function($scope, $stateParams) {
    console.log('OrderDetailCtrl');
    var orderData = $stateParams.item;
    console.log(orderData);


})

.controller('ControlPanelCtrl', function($scope) {

  console.log('ControlPanelCtrl');

})

.controller('SettingCtrl', function($scope) {

  console.log('SettingCtrl');

})
