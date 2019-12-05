const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const { oneOf,matchedData, query,  validationResult } =require('express-validator')
const axios = require('axios')


router.use(bodyParser.json())

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next()
  };

const validation =  query('latlong').exists().withMessage('Latitude and Longitude are required')
                    .isLatLong().withMessage('This is not a valid latitude longitude value')
    


router.route('/')
  .get(validation, handleValidationErrors,  (req, res, next) => {
      
        const params = matchedData(req);
        var latlong  = params['latlong']

        axios.get(`${process.env.HERE_API_URL_BASE}` + 
        latlong + `${process.env.HERE_API_URL_ENDPOINT}`)
            .then(resp => {
                res.json(resp.data.results.items);
            })
            .catch(err => {
                res.json(err)
            })
                 
})


module.exports = router