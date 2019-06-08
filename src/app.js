const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geo = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000 //Heroku

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather App',
        name: 'Lily Wu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lily Wu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Lily Wu',
        msg: 'help text here'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }

    geo.geocode(req.query.address, (error, { latitude, longtitude, place_name } = {}) => {
        // console.log('Error', error)
        // console.log('Data', data)
        if(error) {
            return res.send({ error });
        }
        forecast.forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            console.log(place_name)
            console.log(forecastData)
            res.send([{
                forecast: forecastData,
                location: place_name,
                adress: req.query.address
            }]);
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMsg:'Help article is not found',
        name: 'Lily Wu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Lily Wu'
    })
})

app.listen(port, () => {
    console.log('Server is up on '+port);
})