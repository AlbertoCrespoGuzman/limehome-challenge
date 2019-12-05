const expect = require('chai').expect
const request = require('request');



describe('Status and content', function() {
    describe ('Main page', function() {
        it('status', function(done){
            request('http://localhost:8080/', function(error, response, body) {
                expect(response.statusCode).to.equal(404)
                done()
            })
        })

        it('error content', function(done) {
            request('http://localhost:8080/' , function(error, response, body) {
                const json = {error: 'Not found'}

                expect(body).to.equal(JSON.stringify(json))
                done()
            })
        })
    })

    describe ('Api end-point NO parameters', function() {
        it('status', function(done){
            request('http://localhost:8080/api/v1/hotels', function(error, response, body) {
                expect(response.statusCode).to.equal(400)
                done()
            })
        })
        it('error content', function(done) {
            request('http://localhost:8080/api/v1/hotels' , function(error, response, body) {
                const json = {errors:[
                                {msg:"Latitude and Longitude are required",
                                param:"latlong",
                                location:"query"}
                                ,
                                {msg:"This is not a valid latitude longitude value",
                                param:"latlong",
                                location:"query"}
                            ]}

                expect(body).to.equal(JSON.stringify(json))
                done()
            })
        })
    })
    describe ('Api end-point latlong query parameters', function() {
        it('status void parameter ', function(done){
            request('http://localhost:8080/api/v1/hotels?latlong=""', function(error, response, body) {
                expect(response.statusCode).to.equal(422)
                done()
            })
        })
        it('error content void parameter', function(done) {
            request('http://localhost:8080/api/v1/hotels?latlong=""' , function(error, response, body) {
                const json = {
                            errors: [
                                    {value: '\"\"',
                                    msg: "This is not a valid latitude longitude value",
                                    param: "latlong",
                                    location: "query"
                                    }
                            ]}

                expect(body).to.equal(JSON.stringify(json))
                done()
            })
        })

        const latlongNoNumbersValue = "avenue Lime, NY"
        it('status Coordinates malformed(sending no numbers) parameter ', function(done){
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongNoNumbersValue, function(error, response, body) {
                expect(response.statusCode).to.equal(422)
                done()
            })
        })
        it('error content Coordinates malformed(sending no numbers) parameter', function(done) {
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongNoNumbersValue , function(error, response, body) {
                const json = {
                            errors: [
                                    {value: latlongNoNumbersValue,
                                    msg: "This is not a valid latitude longitude value",
                                    param: "latlong",
                                    location: "query"
                                    }
                            ]}

                expect(body).to.equal(JSON.stringify(json))
                done()
            })
        })

        const latlongNoCommaValue = "-30 140"
        it('status Coordinates malformed(sending no comma) parameter ', function(done){
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongNoCommaValue, function(error, response, body) {
                expect(response.statusCode).to.equal(422)
                done()
            })
        })
        it('error content Coordinates malformed(sending no comma) parameter', function(done) {
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongNoCommaValue , function(error, response, body) {
                const json = {
                            errors: [
                                    {value: latlongNoCommaValue,
                                    msg: "This is not a valid latitude longitude value",
                                    param: "latlong",
                                    location: "query"
                                    }
                            ]}

                expect(body).to.equal(JSON.stringify(json))
                done()
            })
        })

        const latlongOutOfBounds = "-91,181"
        it('status Coordinates malformed(sending coordinates out of bounds) parameter ', function(done){
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongOutOfBounds, function(error, response, body) {
                expect(response.statusCode).to.equal(422)
                done()
            })
        })
        it('error content Coordinates malformed(sending coordinates out of bounds) parameter', function(done) {
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongOutOfBounds , function(error, response, body) {
                const json = {
                            errors: [
                                    {value: latlongOutOfBounds,
                                    msg: "This is not a valid latitude longitude value",
                                    param: "latlong",
                                    location: "query"
                                    }
                            ]}

                expect(body).to.equal(JSON.stringify(json))
                done()
            })
        })

        const latlongCorrect = "-50,150"
        it('status correct Coordinates parameter ', function(done){
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongCorrect, function(error, response, body) {
                expect(response.statusCode).to.equal(200)
                done()
            })
        })
        it('Success content status correct Coordinates parameter', function(done) {
            request('http://localhost:8080/api/v1/hotels?latlong='+latlongCorrect , function(error, response, body) {
                const json = []

                expect(body).to.equal(JSON.stringify(json))
                done()
            })
        })

    })

    
})