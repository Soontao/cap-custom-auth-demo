require("dotenv").config()
const cds = require('@sap/cds/lib');
const cdstest = cds.test(__dirname + '/..');


const AUTHORIZATION = "Authorization"
const toAuthHeaderValue = (user, pass) => `Basic ${Buffer.from(`${user}:${pass}`, "utf-8").toString("base64")}`
const USER = {
  ALICE: "Alice",
  BOB: "Bob"
}
const PASSWORD = "Passw0rD"

describe('Example Test Case', () => {

  it('should support query', async () => {

    // no password, 401 un-auth
    let response = await cdstest.get('/odata/Peoples', {
      validateStatus: () => true
    })
    expect(response.status).toBe(401)

    // wrong password, 401 un-auth
    response = await cdstest.get('/odata/Peoples', {
      headers: {
        [AUTHORIZATION]: toAuthHeaderValue(USER.BOB, "wrongPassword")
      },
      validateStatus: () => true
    })
    expect(response.status).toBe(401)

    // user bob, not have read privileges
    response = await cdstest.get('/odata/Peoples', {
      headers: {
        [AUTHORIZATION]: toAuthHeaderValue(USER.BOB, PASSWORD)
      },
      validateStatus: () => true
    })
    expect(response.status).toBe(403)

    response = await cdstest.get('/odata/Peoples', {
      headers: {
        [AUTHORIZATION]: toAuthHeaderValue(USER.ALICE, PASSWORD)
      },
      validateStatus: () => true
    })
    expect(response.status).toBe(200)
    expect(response.data.value).toHaveLength(1)

  });

  it('should support create and delete', async () => {

    // create a instance
    const response = await cdstest.post('/odata/Peoples',
      {
        UserName: 'theo2'
      },
      {
        headers: {
          [AUTHORIZATION]: toAuthHeaderValue(USER.BOB, PASSWORD)
        }
      }
    )

    expect(response.status).toBe(201)
    expect(response.data.UserName).toBe('theo2')

    // delete created item
    const response2 = await cdstest.delete(`/odata/Peoples(${response.data.ID})`, {
      headers: {
        [AUTHORIZATION]: toAuthHeaderValue(USER.BOB, PASSWORD)
      }
    })
    expect(response2.status).toBe(204)


  });


});