angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Valentina simon',
    lastText: 'Makeup & Nails',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Valentina simon',
    lastText: 'Makeup & Nails,Hair',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Valentina simon',
    lastText: 'Makeup & Nails',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Valentina simon',
    lastText: 'Makeup & Nails,Hair',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Valentina simon',
    lastText: 'Makeup & Nails',
    face: 'img/mike.png'
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
});
