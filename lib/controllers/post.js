const { Router } = require('express');
const checkAuth = require('../middleware/check-auth');
const requestFromUser = require('../middleware/requestFromUser');
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
  })
  
  .patch('/:id', checkAuth, requestFromUser, (req, res, next) => {
    Gram
      .updateCaption(req.params.id, req.body.caption)
      .then(updatedPost => res.send(updatedPost))
      .catch(next);
    
  })
  
  .delete('/:id', checkAuth, requestFromUser, (req, res, next) => {
    Gram
      .delete(req.params.id)
      .then(deletedPost => res.send(deletedPost))
      .catch(next);
  });
  
