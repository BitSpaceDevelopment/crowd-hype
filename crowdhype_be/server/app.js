// Server Setup

const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const port = 5052;
const scoreController = require('./Controllers/scoresController');
const postController = require('./Controllers/postController');
const deleteController = require('./Controllers/deleteController');
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: [
      'http://localhost:3000',
      'https://react.bsd-xr.com',
      'https://reactbe.bsd-xr.com'
  ],
}));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CrowdHype API',
    },
    servers: [
      { url: `http://localhost:${port}` },
    ],
  },
  apis: ['./Controllers/*.js', './docs/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static("public"));
// app setup
//endless
app.get('/endlessScores', scoreController.getEndlessScores);
app.post('/endlessScores', postController.addNewEndlessScore);
app.delete('/endlessScores', deleteController.deleteEndlessScore);

//session
app.get('/sessionScores', scoreController.getSessionScores);
app.post('/sessionScores', postController.addNewSessionScore);
app.delete('/sessionScores', deleteController.deleteSessionScore);

app.listen(port, () => {
  console.log(`crowdhype DB listening on port ${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
})



