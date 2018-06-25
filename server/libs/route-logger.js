module.exports = (req, res, next) => {
  console.log(`RouteLogger: [${req.method}] ${req.url}`);
  next();
};