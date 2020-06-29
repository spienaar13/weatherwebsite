const request = require('request')

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + 
    ".json?access_token=pk.eyJ1Ijoic3BpZW5hYXIxMyIsImEiOiJja2J0MmVlaWIwNXRyMnFxeGxmcWtmMWc0In0.G0ySQflQ0SGJTxIVGux3Jg" +
    "&limit=1"
    
    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } 
        else if (body.features.length === 0) {
            callback("Unable to find location.", undefined)
            } 
        else {
            const data = body.features[0]
            callback(undefined, { 
                latitude: data.center[1],
                longatude: data.center[0],
                location: data.place_name
            })
        }
    })
    
}

module.exports = geocode