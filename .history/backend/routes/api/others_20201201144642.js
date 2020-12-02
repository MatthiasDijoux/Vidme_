var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const adminController = require("../../controllers/adminController.js");
const authController = require("../../controllers/authController.js");
const roomController = require("../../controllers/roomController.js");
const accessRoomController = require("../../controllers/accessRoomController.js");
const {checkTokenMiddleware, extractBearerToken} = require("../middleware/authMiddleware")
const {checkDuplicateEmail} = require('../middleware/verifySignUp')

/* Formulaire de connexion */
router.post('/login', authController.login)
/*  Inscription */
router.post('/register', checkDuplicateEmail, adminController.create)

//  Route protégé
router.get('/secret-route', checkTokenMiddleware, (req, res) => {
  // Récupération du token
  const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
  // Décodage du token
  const decoded = jwt.decode(token, { complete: false })

  return res.json({ content: decoded })
})

/* GET home page. */
// router.get('/test', checkTokenMiddleware, function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send('Test!');
// });


/* Create room. */
// router.get('/', function(req, res, next) {
//   res.render('createRoom', { title: 'Create Room' });
// });


// Create a new Admin
router.post("/admin/add", adminController.create);
// Create a new Room
router.post("/room/add", roomController.create);
// List room 
router.get("/room/all", roomController.findAll);
// Access room 
router.post("/access-room", accessRoomController.connectRoom);

module.exports = router;

