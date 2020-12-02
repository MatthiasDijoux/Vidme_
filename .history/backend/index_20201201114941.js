/**
 *
 * Author:  AppSeed.us - Full Stack App Generator
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/rosoftdeveloper/appseed
 *
 */

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const models = require('./models');
const http = require('http');
/* Make all variables from our .env file available in our process */
require('dotenv').config();

/* Init express */
const app = express();

/* Here we setup the middlewares & configs */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Here we define the api routes */
app.use(require('./routes'));
const port = process.env.PORT || 3000;
const address = process.env.SERVER_ADDRESS || '127.0.0.1';

var server = http.createServer(app);
const servListen = server.listen(port);

console.log("test2 : ",port)
const io = require('./socket').init(servListen);
console.log("test3 : ",port)

const cv = require('opencv4nodejs');
const FPS = 60;
const wCap = new cv.VideoCapture(0);
// wCap.set(cv.CAP_PROP_FRAME_WIDTH, 1000);
// wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 600);
let users = [];
let messages = [];
let index = 0;

console.log("test4 : ",port)
/* Create everything automatically with sequelize ORM */
models.sequelize.sync().then(function () {

});

io.on('connection', socket => {
	console.log('Client connected using websocket');
	setInterval(() => {
		const frame = wCap.read();
		const image = cv.imencode('.jpg', frame).toString('base64');
		socket.broadcast.emit('image', image);
	}, 1000 / FPS); 

	socket.emit('loggedIn', {
		users: users.map(s => s.username),
		messages: messages
	});

	socket.on('newuser', username => {
		console.log(`${username} à rejoint le tchat.`);
		socket.username = username;
		users.push(socket);

		io.emit('userOnline', socket.username);
	});

	socket.on('msg', msg => {
		let message = {
			index: index,
			username: msg['user'],
			msg: msg['message']
		}
		let msgEnvoi = []
		msgEnvoi.push(message);

		io.emit('msg', msgEnvoi);

		index++;
	});

	// Deconnexion
	socket.on("disconnect", () => {
		console.log(`${socket.username} à quitter le tchat.`);
		io.emit("userLeft", socket.username);
		users.splice(users.indexOf(socket), 1);
	});
});
module.exports = app;