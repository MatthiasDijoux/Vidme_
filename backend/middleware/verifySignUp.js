const db = require("../models");
const Admin = db.admin;

exports.checkDuplicateEmail = (req, res, next) => {
  // Aucune information à traiter
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Error. Please enter email and password' })
  }
  
  // Admin
  Admin.findOne({
    where: {
      email: req.body.email
    }
  }).then(admin => {
      // Email
      if (admin) {
        res.status(400).send("Failed! Email is already in use!");
        // res.status(400).send({
        //   message: "Failed! Email is already in use!"
        // });
        return;
      }
            
      next();
  });
};