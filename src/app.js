const express = require('express');
const morgan = require('morgan');

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Automotores',
        version: '1.0.0'
      }
    },
    apis: ['./src/app.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  //Importacion de archivos particulares

  const {arrayInfo} = require('./info');
  const {existeAuto} = require('./middleware');

  //Inicializacion del server
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));


/**
 * @swagger
 * /:
 *  get:
 *     sumary: programa
 *     description: esto
 *     responses:
 *          200:
 *               description: OK
 */
app.get('/', function (req, res) {
    res.send({ programa: "automotores"})
})
 /**
 * @swagger
 * /automotores:
 *  get:
 *     sumary: automotores
 *     description: Listado de automotores
 *     responses:
 *           200:
 *             description: Listado de automotores
 */
app.get('/automotores', function (req, res) {
    console.log(arrayInfo);
    res.send(arrayInfo);
})

 /**
 * @swagger
 * /automotores:
 *  post:
 *     sumary: automotores
 *     description: Listado de automotores
 *     responses:
 *          200:
 *               description: OK
 */
app.post('/automotores', function (req, res) {
    let auto = req.body;
    console.log(auto);
    arrayInfo.push(auto);
    res.send(auto);
});

/**
 * @swagger
 * /automotores/{id}:
 *  get:
 *      sumary: Auto por Id
 *      description: Informacion de automotores.
 *      parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          description: ID del auto a recuperar.
 *          schema:
 *              type: integer
 *              example: 1
 *      responses:
 *          200:
 *              description: Listado ok.
 */
app.get('/automotores/:id', existeAuto,  function (req, res) {
    let auto = req.auto;
    console.log(auto);
    res.send(auto);
});

app.delete('/automotores/:id', existeAuto,  function (req, res) {
    let auto = req.auto;
    let index = req.index
    resultado = 'Borrado segun el indice: ' + index
    arrayInfo.splice(index, 1);
    res.send({ resultado, resultado, valor: auto});
});

app.put('/automotores/:id', existeAuto,  function (req, res) {
    let autoNuevo = req.body;
    let index = req.index
    resultado = 'Actualizacion segun el indice: ' + index
    arrayInfo[index] = autoNuevo;
    res.send({ resultado, resultado, valor: autoNuevo});
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(5000, function() {
    console.log('Escuchando el puerto 5000!');
});