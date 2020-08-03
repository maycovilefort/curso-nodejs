const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(db.findUsers());
});

router.post('/', (request, response) => {
  const user = db.insertUser(request.body);
  response.statusCode(201).json(user);
})

module.exports = router;
