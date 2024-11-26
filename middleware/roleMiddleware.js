const authorize = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).send('Forbidden: Insufficient permissions');
      }
      next();
    };
  };
  
  module.exports = authorize;
  