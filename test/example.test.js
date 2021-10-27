require("dotenv").config()
const cds = require('@sap/cds/lib');
const cdstest = cds.test(__dirname + '/..')


describe('Example Test Case', () => {

  it('should support query', async () => {

    const response = await cdstest.get('/odata/Peoples')
    expect(response.status).toBe(200)
    expect(response.data.value).toHaveLength(1)

  });

  it('should support create and delete', async () => {

    // create a instance
    const response = await cdstest.post('/odata/Peoples', {
      UserName: 'theo2'
    })

    expect(response.status).toBe(201)
    expect(response.data.UserName).toBe('theo2')

    // delete created item
    const response2 = await cdstest.delete(`/odata/Peoples(${response.data.ID})`)
    expect(response2.status).toBe(204)


  });


});