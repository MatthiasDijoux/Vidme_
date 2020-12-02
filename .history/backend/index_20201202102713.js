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

const io = require('./socket').init(servListen);

const cv = require('opencv4nodejs');
const FPS = 60;
const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 1000);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 600);
let users = [];
let messages = [];
let index = 0;
var frame = null;
var image = null;
/* Create everything automatically with sequelize ORM */
models.sequelize.sync().then(function () {

});
io.on('connection', socket => {
	console.log('Client connected using websocket');
	var interval = null;
	// /* interval = setInterval(() => {
	// 	frame = wCap.read();
	// 	image = cv.imencode('.jpg', frame).toString('base64');
	// 	socket.broadcast.emit('image', image);
	// }, 1000 / FPS); */
	console.log('log input param : ' + socket.handshake.query.room);

	let room = socket.handshake.query.room;
	//	Rejoindre le room
	socket.join(room);

	socket.in(room).emit('loggedIn', {
		users: users.map(s => s.username),
		messages: messages,
		room: room
	},);

	socket.on('newuser', username => {
		console.log(`${username} à rejoint le tchat.`);
		socket.username = username;
		users.push(socket);

		io.in(room).emit('userOnline', socket.username);
	});

	socket.on('msg', msg => {
		let message = {
			index: index,
			username: msg['user'],
			msg: msg['message']
		}
		let msgEnvoi = []
		msgEnvoi.push(message);

		// io.in(room).emit('msg', msgEnvoi);
		socket.broadcast.to(room).emit('msg', msgEnvoi);

		index++;
	});

	// Deconnexion
	socket.on("disconnect", () => {
		console.log(`${socket.username} à quitter le tchat.`);
		io.in(room).emit("userLeft", socket.username);
		users.splice(users.indexOf(socket), 1);
	});
});
module.exports = app;