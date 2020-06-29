const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// define path for express config
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath  = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../Templates/views')
const partPath = path.join(__dirname, '../Templates/partials')

// Setup handlebars engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, resp) => {
    resp.render('index', {
        title: "Weather App",
        name: 'Stephane Pienaar'
    })
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: "About me",
        name: "Stephane Pienaar"
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: "Help Page", 
        message: "Have you tried switching it off then switching it back on again?",
        name: "Stephane Pienaar"
    })
})

app.get('/weather', (req, resp) => {
    const address = req.query.address
    if (!address) {
        return resp.send({error: "Query string required. Provide a location"})
    }
    geocode(address, (error, {latitude, longatude, location} = {}) => {
        if  (error) {
            return resp.send({error})
        }

        forecast(latitude, longatude, (error, data2) => {
            if (error) {
                return resp.send({error})
            }   
            resp.send({address, forecast: data2, location})
    
        })
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('404', {
        title: "404 page",
        message: "help article not found", 
        name: "Stephane Pienaar"
    })
})

app.get('*', (req, resp) => {
    resp.render('404', {
        title: "404 page",
        message: "Directory not found", 
        name: "Stephane Pienaar"
    })
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})