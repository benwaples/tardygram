const { Router } = require('express');
const checkAuth = require('../middleware/check-auth');
const Gram = require('../models/gram');

module.exports = Router()
  .post('/', checkAuth, (req, res, next) => {
    Gram
      .insert({ ...req.body, userId: req.user.id })
      .then(gram => res.send(gram))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Gram
      .findAll()
      .then(posts => res.send(posts))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Gram
      .findById(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  });
  
