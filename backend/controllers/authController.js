const db = require("../models");
const Admin = db.admin;
const Room = db.room;
const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const adminController = require("./adminController");

var jwt = require("jsonwebtoken");

const SECRET = "vidme-secret"

exports.login = async (req, res) => {
 
  // Pas d'information à traiter
  console.log("Req Body : ",req.body)
  if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Error. Please enter the correct email and password' })
  }

  // Checking
  // const admin = admins.find(u => u.email === req.body.email && u.password === req.body.password)

  const admin = await adminController.findOneByEmail(req,res)

  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    admin.password
  );

  if (!passwordIsValid) {
    // return res.status(401).send({
    //   accessToken: null,
    //   message: "Invalid Password!"
    // });
    return res.status(401).send("Invalid Password!");
  }

  // Pas bon
  if (!admin) {
      return res.status(400).json({ message: 'Error. Wrong login or password' })
  }

  const token = jwt.sign({
      id: admin.id,
      email: admin.email
  }, SECRET, { expiresIn: '3 hours' })

  return res.json({ id: admin.id, email: admin.email, accessToken: token })
};
