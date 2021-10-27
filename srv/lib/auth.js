const cds = require('@sap/cds')
const native = require("@newdash/native")

const logger = cds.log("auth")

class BasicUser extends cds.User {
  /**
   * @param {string} id 
   * @param {Set} scopes 
   */
  constructor(id, scopes) {
    super(id)
    this.scopes = scopes
    this.scopes.add("authenticated-user") // for auth
  }
  is(scope) {
    return this.scopes.has(scope)
  }
}

/**
 * 
 * @param {import("express").Response} res 
 */
const reject = (res) => {
  res.status(401)
  res.setHeader("WWW-Authenticate", `Basic realm="User"`)
  res.end()
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (authorization) {
      const userAndPass = authorization.split(" ")[1]
      const [user, plainPassword] = Buffer.from(userAndPass, "base64").toString("utf-8").split(":")
      // yes, access database here, 
      // if there are namespace in modeling, the literal should add the namespace prefix
      const dbUser = await cds.run(SELECT.one.from("TechUser").where({ UserId: user }))
      if (dbUser === null) {
        throw new Error(`not found user with id ${user}`)
      }
      // verify with bcrypt, could switch to other hash algorithms
      if (!native.bcrypt_verify(plainPassword, dbUser.EPassword)) {
        throw new Error("password wrong")
      }
      // use a simple plain `Scopes` field to map to custom user
      // also, you can define a relational table to save user scopes, 
      // e.g. user <-1-to-many-> role <-1-to-many-> scopes
      req.user = new BasicUser(user, new Set(dbUser.Scopes.split(",")))
      // auth ok, go to next
      next()
    } else {
      throw new Error("no auth header")
    }
  }
  catch (error) {
    logger.error("auth error", error)
    reject(res)
  }

}