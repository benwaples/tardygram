const { Router } = require('express');
const checkAuth = require('../middleware/check-auth');
const requestFromUser = require('../middleware/requestFromUser');
const Comment = require('../models/comment');

module.exports = Router()
  .post('/', checkAuth, (req, res, next) => {
    req.body.commentBy = req.user.id;
    Comment
      .insert(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Comment
      .findAll()
      .then(comments => res.send(comments))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Comment
      .delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });
