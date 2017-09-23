angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'Bedroom, kitchen',
    face: 'img/profile/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Bedroom',
    face: 'img/profile/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'Kitchen',
    face: 'img/profile/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Kitchen',
    face: 'img/profile/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'Bedroom',
    face: 'img/profile/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Server', function ($http) {

        return {
            httpDetails: function ( method, url, data) {

                return $http({
                    headers: 'Content-Type:application/json',
                    method: method,
                    url: url,
                    data: JSON.stringify(data)

                }).success(function (response) {
                    /* console.log("success"); */
                    return response;
                }).error(function (error) {

                    console.log(error);
                    // alert("error");
                    return error;
                });
            }
        }
});
