const db = require("../models");
const Admin = db.admin;
const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");

const SECRET = "vidme-secret"

// Create and Save a new Admin
exports.create = async (req, res) => {
  
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  // Create a Admin
  const admin = {
    email: req.body.email,
    password: hashedPassword,
  };

  // Save admin in the database
  Admin.create(admin)
    .then(data => {
      // res.send(data);
      const token = jwt.sign({
        id: data.id,
        email: data.email
      }, SECRET, { expiresIn: '3 hours' })
    
      return res.json({ id: admin.id, email: admin.email, accessToken: token })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Admin."
      });
    });
};

// Retrieve all Admin from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Admin.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Admins."
      });
    });
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Admin.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Admin with id=" + id
      });
    });
};

// Find a single Admin by email
exports.findOneByEmail = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  const admin = await Admin.findOne({ where: { email: req.body.email } });

  if (admin === null) {
    console.log('Not found!');
  } else {
    console.log(admin instanceof Admin); // true
    console.log(admin.email); // 'Email'
    return admin
  }
}
// Update a Admin by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Admin.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Admin was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Admin with id=" + id
      });
    });
};

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
  
};
