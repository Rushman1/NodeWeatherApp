const request = require('request');


const geocode = (address, callback)=>{

    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    const mapboxAccessToken = 'pk.eyJ1IjoidHNhdmFnZWltaCIsImEiOiJja21pczd1dmYwaDdhMm5sZnc0cHg2ODdxIn0.Tuw7dqeaBcIxZ66U3Be99Q';
    //const baseAddress = '8005%20Vision%20St%20Las%20Vegas%20NV%2089123';
    const baseAddress = address;
    const url = `${geocodingUrl}/${encodeURIComponent(baseAddress)}.json?access_token=${mapboxAccessToken}&limit=1`;

    request({
        url, // Object property shorthand syntax
        json: true
    }, (error, {body})=>{ // Destructuring
        if(error || body.features === undefined || body.features.length===0){
            callback('There was an error getting the GeoCode address.',undefined);
            return;
        }
        const lat = body.features[0].center[1];
        const lon = body.features[0].center[0];
        const data = {
            location: body.features[0].place_name,
            latitude: lat,
            longitude: lon
        };
        callback(undefined,data);
    });
};


module.exports = geocode;