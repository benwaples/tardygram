module.exports = (req, res, next) => {
  try {
    if(Number(req.body.userId) === Number(req.user.id)) {
      next();
    } else {
      throw new Error('invalid user');
    }
  } catch(error) {
    next(error);
  }
};
