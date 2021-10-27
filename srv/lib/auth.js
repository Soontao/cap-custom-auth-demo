const cds = require('@sap/cds/lib')

class DummyUser extends cds.User {
  is() {
    return true;
  }
}

module.exports = (req, res, next) => {
  req.user = new DummyUser('dummy')
  next()
}