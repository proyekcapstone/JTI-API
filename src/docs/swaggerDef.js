const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'JTI API Documentation',
    version,
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: `https://jti-api.herokuapp.com/v1`,
    },
  ],
};

module.exports = swaggerDef;
