const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Define path for static assets
app.use(express.static(publicDirPath));

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'Address must be provided'})
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Cooper Crowell'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: "Cooper Crowell"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        body: 'This is the help pages body. There will be more content as more questions are asked.',
        name: 'Cooper Crowell'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        body: 'No such help page exists'
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send('Please provide search term.');
    } 
        console.log(req.query.search);
    res.send({
        products: []
    });
    
    
    
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        name: 'Cooper Crowell',
        body: 'No such page exists.'
    })
});

app.listen(port, ()=> {
    console.log('Server is up and running on port ' + port);
})