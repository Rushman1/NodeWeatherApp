const request = require('request');

const weather = ({location, longitude, latitude}, callback)=>{
const weatherUnits = 'f';
const url = `http://api.weatherstack.com/current?access_key=518e109f75dcfbf6a85284ca1a327f4b&query=${latitude},${longitude}&units=${weatherUnits}`;
    request({
        url,
        json: true // Automatically parses to JSON
    }, (error, {body})=>{
        if(error){
            callback('Unable to connect to the Weather Service!', undefined);
            return;
        }
    
        if(body.error){
            callback('Location could not be found', undefined);
            return;
        }
    
        const data = {
            location: location,
            description: body.current.weather_descriptions[0],
            current: body.current.temperature,
            feelslike: body.current.feelslike,
            icon: body.current.weather_icons[0]
        };
        callback(undefined, data);
    });
};

module.exports=weather;