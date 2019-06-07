const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFsaW53dSIsImEiOiJjandhc2txdmowZGM5M3ltOWcwN2dyM3d3In0.JmGzOjd57Et2rk1JyuCalw';

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            console.log('Error occur');
            callback('Error occur', undefined);
        }else if(body.features.length == 0) {
            console.log('Place not found');
            callback('Place not found', undefined);
        }else {
            const longtitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const place_name = body.features[0].place_name;
            callback(undefined, {
                longtitude: longtitude,
                latitude: latitude,
                place_name: place_name
            })
            
        }
    })
}

module.exports = {
    geocode: geocode
}