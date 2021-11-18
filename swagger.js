const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'e-Test API',
    description: 'Description',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './Routes/companyProfile',
    './Routes/test',
    './Routes/question',
    './Routes/section',
    './Routes/testScore',
    './Routes/sectionScore',
    './Routes/admin',
    './Routes/candidate',
    './Routes/authentication',
];
// const endpointsFiles = [
//     './app.js'
// ];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

// swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app')           // Your project's root file
})