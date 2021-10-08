module.exports = (req, res, next) => {
  const { session } = req.cookies;
  
  if (!session) {
    throw new Error('You must be signed in to view');
  }
  
  req.session = session;
  
  next();
};
