const express = require('express')
const bodyParser = require('body-parser')
const hotelsRouter = require('./routes/hotelsRouter')
var cors = require('cors')
const compression = require('compression')
const swaggerUi = require('swagger-ui-express')
const openApiDocumentation = require('./documentation/openApiDocumentation')
require('dotenv').config()


var app = express()
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(compression())
app.use(bodyParser.json({limit: '100mb'}))

app.use('/api/v1/hotels', hotelsRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation))

app.use(function(req, res, next) {
  res.status(404).send({ 'error': 'Not found' })
});


app.listen(`${process.env.PORT}`, function(){
  console.info('Server listening on port ' + this.address().port)
})