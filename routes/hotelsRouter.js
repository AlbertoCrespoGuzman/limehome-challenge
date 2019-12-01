const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const { oneOf,matchedData, query,  validationResult } =require('express-validator')
const axios = require('axios')


router.use(bodyParser.json())
router.use(bodyParser.json())

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        return res.status(422).json({ errors: extractedErrors })
    }
    next()
  };

const validation = oneOf([
    [
        query('latlong').exists().withMessage('Latitude and Longitude are required')
        .isLatLong().withMessage('This is not a valid latitude longitude value')
    ],
    query('address').exists().withMessage('Address are required')
    .isString().withMessage('Address must be String')
    .isAlphanumeric().withMessage('This is not a valid value for Address')
    .notEmpty().withMessage('Address cannot be empty')
    ])


router.route('/')
  .get(validation, handleValidationErrors,  (req, res, next) => {
      
        const params = matchedData(req);
        var latlong = null

        if(!params['latlong']){
            console.log('get coordinates from adddress: ', {address} = params)
        }else{
            latlong = params['latlong']
        }

      

        axios.get(`${process.env.HERE_API_URL_BASE}` + 
        latlong + `${process.env.HERE_API_URL_ENDPOINT}`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {

            })
                    



})


module.exports = router