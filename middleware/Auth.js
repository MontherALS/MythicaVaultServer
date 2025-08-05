function isAuth(req, res, next) {
  try {
    const { admin } = req.user;
    if (!admin) {
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = isAuth;
