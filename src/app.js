const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

var hbs = require('hbs')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine nad view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sushant Ratnam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sushant Ratnam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Sushant Ratnam'
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        error: 'Help article not found',
        name: 'Sushant Ratnam'

    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        error: 'Page not found',
        name: 'Sushant Ratnam'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port: 3000')
})