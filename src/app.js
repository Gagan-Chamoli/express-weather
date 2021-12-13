const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geoCode = require('./utils/geocode.js');

const app = express();


//Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public') ;
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //Customize views directory
hbs.registerPartials(partialsPath);

// Setup directory to serve
app.use(express.static(publicDirectoryPath));  


app.get('', (request, response)=>{
    response.render('index', {
        title: 'Weather app',
        name: 'Gagan Chamoli'
    });
});

app.get('/about', (request,response)=>{
    response.render('about',{
        title: 'About me',
        name: 'Gagan Chamoli'
    })
});

app.get('/help', (request,response)=>{
    response.render('help',{
        title: 'Help page',
        helpText: 'This is some helpful text',
        name: 'Gagan Chamoli'
    })
});

app.get('/help/*', (request,response)=>{
    response.render('notfound',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Gagan Chamoli'
    })
});

app.get('/weather',(request, response)=>{
    if(!request.query.address){
        return response.send({'error':'You must provide an address'});
    }

    geoCode(request.query.address, (error, { latitude, longitude, location } = {})=>{
        if(error){
            return response.send({error:error});
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return response.send({error:error});
                }
                
                response.send({forecast:forecastData,location:location,address:request.query.address});
            });    
    });
});

app.get('*',(request,response)=>{
    response.render('404', {
        title: '404',
        name: 'Gagan Chamoli',
        errorMessage : 'Page not found'
    });
});

app.listen('3000',()=> console.log('Listening at 3000'));