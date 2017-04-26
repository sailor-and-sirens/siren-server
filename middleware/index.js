const auth = require('./authentication');
const headers = require('./headers');

module.exports = {
  auth: auth.authenticate,
  headers: headers.headers
};
