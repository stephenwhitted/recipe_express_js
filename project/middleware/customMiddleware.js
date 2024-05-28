// middleware/customMiddleware.js
module.exports.logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };
  
  module.exports.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  