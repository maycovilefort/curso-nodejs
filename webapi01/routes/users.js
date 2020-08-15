const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(db.findUsers());
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  response.json(db.findUser(id));
})

router.post('/', (request, response) => {
  const user = db.insertUser(request.body);
  response.status(201).json(user);
})

router.put('/:id', (request, response) => {
  const id = request.params.id;
  const user = db.updateUser(id, request.body, true);
  response.status(200).json(user);
})

router.patch('/:id', (request, response) => {
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
