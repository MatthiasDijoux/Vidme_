var express = require('express');
var app = express();
var router = express.Router();
const cv = require('opencv4nodejs');
const FPS = 60;
const wCap = new cv.VideoCapture(0);
const server = require('http').Server(app)
const io = require('socket.io')(server, { log: false, origins: '*:*' })
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

router.get('/', function (req, res, next) {
    return res.status(200).json("image");
});


module.exports = router;