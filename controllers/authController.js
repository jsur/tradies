exports.checkAuth = (req, res, next) => {
  if (!req.headers.app_id || req.headers.app_id !== 'maybe-jwt-is-better') {
    res.sendStatus(403);
    return;
  }
  next();
};
