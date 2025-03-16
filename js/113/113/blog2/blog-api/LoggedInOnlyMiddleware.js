export default async (req, res, next) => {
  if (!req.session.username) {
    const error = new Error('You must be logged in to add a post');
    error.statusCode = 401;
    return next(error);
  }
  next();
};
