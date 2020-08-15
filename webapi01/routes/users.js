const express = require('express');
const router = express.Router();
const db = require("../models/db");
const userSchema = require("../models/userSchema");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(db.findUsers());
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  response.json(db.findUser(id));
})

function validationMiddleware(request, response, next){
  if(["POST", "PUT"].indexOf(request.method) !== -1){
    if(!request.body.nome || !request.body.idade)
      return response.status(422).json({error: "nome and idade are required."});
  }

  const { error } = userSchema.validate(request.body);
  if(error)
    return response.status(422).json({error: error.details});
  else
    next();
}

router.post('/', validationMiddleware, (request, response) => {
  const user = db.insertUser(request.body);
  response.status(201).json(user);
})

router.put('/:id', validationMiddleware, (request, response) => {
  const id = request.params.id;
  const user = db.updateUser(id, request.body, true);
  response.status(200).json(user);
})

router.patch('/:id', validationMiddleware, (request, response) => {
  const id = request.params.id;
  const user = db.updateUser(id, request.body, false);
  response.status(200).json(user);
})

router.delete('/:id', (request, response) => {
  const id = request.params.id;
  const user = db.deleteUser(id);
  response.status(200).json(user);
})

module.exports = router;
