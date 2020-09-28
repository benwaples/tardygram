const { Router } = require('express');
const checkAuth = require('../middleware/check-auth');
const Service = require('../services/user-service');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const attachCookie = (user, res) => {
  const token = Service.makeToken(user);
  res.cookie('session', token, {
    maxAge: ONE_DAY_IN_MS,
    httpOnly: true,
    sameSite: 'none'
  });
};


module.exports = Router()
  .post('/signup', (req, res, next) => {
    Service
      .create(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })
  
  .post('/login', (req, res, next) => {
    Service
      .authorize(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })
  
  .get('/verify', checkAuth, (req, res, next) => {
    res.send(req.user);
  });
