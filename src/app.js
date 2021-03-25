const path = require('path');
const express = require('express'); // Exposes a single function
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather-forecast');

const app = express();


// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'..', 'public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath); // views uses the 'views' directory so renaming it to templates needs to be told to express...
hbs.registerPartials(partialsPath);

// Used to customize Express
// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('',(req, res)=>{
    res.render('index',{
        title: 'Here is my title',
        name: 'Tim Savage'
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Tim Savage'
    });
});

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help!',
        name: 'Tim Savage',
        message: 'Here is a help message. Please contact me!'
    });
});


// Not used with the app.use(express.static())
// app.get('',(req, res)=>{
//     //console.log(req);
//     res.send('<h1>Weather</h1>');
// }); // Takes in 2 arguments 'route' and function that takes in 2 variables (request and response) and tells express what to do

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            title: 'Missing Address',
            name: 'Tim Savage',
            error: 'You must enter an address to search for!'
        });
    }

    geocode(req.query.address,(error,{location, longitude, latitude}={})=>{
        if(error){
            return res.send({
                error: error
            });
        }

        weather({location, longitude, latitude}, (weatherError, {location, description, current, feelslike, icon})=>{
            if(weatherError){
                return res.send({
                    error: weatherError
                });
            }
            return res.send({
                location: location,
                description: description,
                current: current,
                feelslike: feelslike,
                icon: icon
            });
            // console.log(`The weather at ${location} is:`);
            // console.log(`${description}. It is currently ${current}\xB0 F out. It feels like ${feelslike}\xB0 F.`);
        });
    
    });
});

app.get('/products',(req, res)=>{
    if(!req.query.search){
        // If we don't return from this if statement, then we will get an error message that states:
        // Cannot set headers after they are sent to the client
        // That happens because the rest of this method runs even though we did a res.send()
        return res.send({
            error: 'You must provide a search term'
        });
    }
    const search = req.query.search;
    res.send({
        products: []
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help!',
        name: 'Tim Savage',
        message: 'Help Article not found'
    });
});

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404!',
        name: 'Tim Savage',
        message: 'Page not found'
    });
});

// Start server
app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
}); // listens on a specific port with an optional function that runs when the server starts up