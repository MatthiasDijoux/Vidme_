const db = require("../models");
const Room = db.room;

exports.connectRoom = (req, res) => {
    
    console.log(req.body)
    if(req.body.roomToken){
      Room.findOne({
        where: {
            token: req.body.roomToken
        }
        })
      .then(room => {
        if (!room) {
          return res.status(404).send({ message: "Room Not found." });
        }
        
        console.log(room)
        
        res.status(200).send({
          roomId: room.id,
          room: room.nom,
          pseudo: req.body.pseudo
        });
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }else {
      return res.status(404).send({ message: "Room Not found." });
    }

  };