'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _superscript = require('superscript');

var _superscript2 = _interopRequireDefault(_superscript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run this and then telnet to localhost:2000 and chat with the bot

var sockets = [];

var botHandle = function botHandle(err, bot) {
  var receiveData = function receiveData(socket, bot, data) {
    // Handle incoming messages.
    var message = '' + data;

    message = message.replace(/[\x0D\x0A]/g, '');

    if (message.indexOf('/quit') === 0 || data.toString('hex', 0, data.length) === 'fff4fffd06') {
      socket.end('Good-bye!\n');
      return;
    }

    // Use the remoteIP as the name since the PORT changes on ever new connection.
    bot.reply(socket.remoteAddress, message.trim(), function (err, reply) {
      // Find the right socket
      var i = sockets.indexOf(socket);
      var soc = sockets[i];

      soc.write('\n> ' + reply.string + '\n');
      soc.write('> ');
    });
  };

  var closeSocket = function closeSocket(socket, bot) {
    var i = sockets.indexOf(socket);
    var soc = sockets[i];

    console.log('User \'' + soc.name + '\' has disconnected.\n');

    if (i !== -1) {
      sockets.splice(i, 1);
    }
  };

  var newSocket = function newSocket(socket) {
    socket.name = socket.remoteAddress + ':' + socket.remotePort;
    console.log('User \'' + socket.name + '\' has connected.\n');

    sockets.push(socket);

    // Send a welcome message.
    socket.write('HELLO \'' + socket.name + '\'\n');
    socket.write('INTERFACE 2037 READY FOR INQUIRY\n\n');

    // Send their prompt.
    socket.write('> ');

    socket.on('data', function (data) {
      receiveData(socket, bot, data);
    });

    // Handle disconnects.
    socket.on('end', function () {
      closeSocket(socket, bot);
    });
  };

  // Start the TCP server.
  var server = _net2.default.createServer(newSocket);

  server.listen(2000);
  console.log('TCP server running on port 2000.\n');
};

// This assumes the topics have been compiled to data.json first
// See superscript/src/bin/parse for information on how to do that.

// Main entry point
var options = {
  factSystem: {
    clean: true
  },
  importFile: './data.json'
};

_superscript2.default.setup(options, function (err, bot) {
  botHandle(null, bot);
});