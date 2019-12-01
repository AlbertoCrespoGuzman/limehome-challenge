const express = require('express')
const bodyParser = require('body-parser')
const hotelsRouter = require('./routes/hotelsRouter')
var cors = require('cors')
const compression = require('compression')
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


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(`${process.env.PORT}`, function(){
  console.info('Server listening on port ' + this.address().port)
})