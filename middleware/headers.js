var headers = function (req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.header('access-control-allow-headers', 'content-type, accept');
  res.header('access-control-max-age', 10);
  res.header('x-xss-protection', 0);
  next();
};

module.exports = {
  headers: headers
};
