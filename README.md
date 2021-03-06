# CAP Demo for Auth

[![node-test](https://github.com/Soontao/odata-v4-cap-demo/actions/workflows/nodejs.yml/badge.svg?branch=mysql)](https://github.com/Soontao/odata-v4-cap-demo/actions/workflows/nodejs.yml)

## Setup

1. create a `.env` file for development, fill the database connection information
2. execute `npm run deploy` to deploy the database schema to database
3. execute `npm start` to start the server
4. execute `npm run test` to perform unit test

## Environment

> put database configuration in `environment`, for development, just use the `.env` file.

`.env` file example

```
CDS_MYSQL_USER=cdstest
CDS_MYSQL_PASSWORD=cdstest
CDS_MYSQL_DATABASE=cdstest
CDS_MYSQL_HOST=mysql
CDS_MYSQL_PORT=3306
```

## Custom Auth

### CDS Configuration

```json5
{
  "cds": {
    "requires": {
      "db": {
        "kind": "mysql"
      },
      "mysql": {
        "impl": "cds-mysql",
        "models": [
          "srv",
          "db"
        ]
      },
      "auth": {
        "impl": "srv/lib/auth.js" // customize
      }
    }
  }
}
```

### [Auth Impl](./srv/lib/auth.js)

### Users

* Alice
  - people_read
* Bob
  - people_write

### Password for test

`Passw0rD`

## Reference

* [CAP NodeJS Authentication](https://cap.cloud.sap/docs/node.js/authentication)
* [CAP Authorization and Access Control](https://cap.cloud.sap/docs/guides/authorization)