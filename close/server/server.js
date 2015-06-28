//global variable
var express = require('express')
var app = express();
var path = require('path');

var http = require('http');
var server = http.createServer();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server: server});

var clients = [];
var clientId = 0;
//var gif.src = "images/runningman.gif";
var emoji = require('cool-ascii-faces');

server.listen(5000);

function send(client, message) {
	var text = JSON.stringify(message);
	client.send(text);
	console.log('To #' + client.id + ': ' + text);
}

function nameExists(name) {
	for (var i = 0, n = clients.length; i < n; ++i) {
		if (clients[i].name == name)
			return true;
	}
	return false;
}

function coerceName(name) {
	name = String(name);
	if (!nameExists(name))
		return name;
	var index = 2;
	var altName;
	while (nameExists(altName = name + index))
		++index;
	return altName;
}

wss.on('connection', function(client) {
	console.log('websocket connection open');
	client.id = ++clientId;
	client.emoji = emoji();
	clients.push(client);

	function broadcast(message, all) {
		for (var i = 0, n = clients.length; i < n; ++i) {
			if (all || clients[i] != client) {
				send(clients[i], message);
			}
		}
	}

	client.on('message', function(messageText) {
		console.log('received: ' +  messageText);
		var message = JSON.parse(messageText);
		switch (message.action) {
			case 'connect':
				client.name = coerceName(message.name);
				client.emoji = client.name == 'peter' ? '¯\\_(ツ)_/¯' : emoji()
				broadcast({
					action: 'connect',
					name: client.name,
					emoji: client.emoji
				}, true);
				break;

			case 'move':
				broadcast({
					action: 'move',
					name: client.name,
					x: +message.x,
					y: +message.y
				});
				break;

			case 'play':
				broadcast({
					action: 'play',
					name: client.name,
					sound: String(message.sound)
				});
				break;
		}
	});

	client.on('close', function() {
		console.log('websocket connection close');
		clients.splice(clients.indexOf(client), 1);
		broadcast({
			action: 'disconnect',
			name: client.name
		});
	});

	// client connected, send him the list of already connected clients
	send(client, {
		action: 'hello',
		emoji: client.emoji
	});
	for (var i = 0, n = clients.length; i < n; ++i) {
		if (clients[i] != client) {
			send(client, {
				action: 'connect',
				name: clients[i].name,
				emoji: clients[i].emoji
			});
		}
	}
});

/*Run the server.*/
app.use(express.static(path.join(__dirname, '../client')));

app.listen(8080);
console.log('App listening on http://localhost:8080');
