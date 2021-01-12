const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// views paths
const viewsPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

// Views config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPaths);

// Static path directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yogesh Kumar',
    });
});

app.get('/about', (req, res) => {
    // res.send(express.static(path.join(__dirname, '../public/about.html')));

    res.render('about', {
        title: 'About',
        name: 'Yogesh Kumar',
    });
});

app.get('/help', (req, res) => {
    // res.send(express.static(path.join(__dirname, '../public/help.html')));

    res.render('help', {
        title: 'Help',
        name: 'Yogesh Kumar',
        helpText: 'I am a message',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        notFoundMessage: 'Help artticle not found',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required',
        });
    }

    geocode(
        req.query.address,
        (error, { longituide, latitude, location } = {}) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            forecast(longituide, latitude, (error, { forecast }) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }
                res.json({
                    forecast,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get('/products', (req, res) => {
    console.log(req.query.search);
    if (!req.query.search) {
        return res.send({
            error: 'need search value',
        });
    }

    res.send({
        products: [],
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        notFoundMessage: 'Page not found',
    });
});

app.listen(port, () => {
    console.log('server started on port:', port);
});
