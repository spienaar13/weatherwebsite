const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=23f8ef001c3d87ecbe0d0623de77f68e&query=" + 
    lat + "," + long +"&units=m"

    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
           callback("Unable to connect to weather service", undefined)
        } 
        else if (body.error) {
            callback("Unable to find location, try again", undefined)
        } 
        else {
            const data = body.current
            callback(undefined, "Today's weather is " + data.weather_descriptions[0] + 
            " at " + data.temperature + ", UV indes of " + data.uv_index + " and " + data.precip + 
            " precipitation"
            )
        }
    })
}

module.exports = forecast