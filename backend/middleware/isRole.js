module.exports = (role) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(403).json({ message: 'No role assigned to user.' });
    }
    if (req.userRole !== role) {
      return res.status(403).json({ message: `Access denied. ${role} role required.` });
    }
    next();
  };
};
