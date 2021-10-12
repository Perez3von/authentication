module.exports = (req, res, next) => {
  try {
    if (req.user.role !== '2') throw new Error('Unauthorized');
  
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
