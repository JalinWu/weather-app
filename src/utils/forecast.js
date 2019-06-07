const request = require('request');


const forecast = (la, lo, callback) => {

    const url =`https://api.darksky.net/forecast/1600a3bbe50258110dce265dc8ed9c70/${la},${lo}?units=si`;

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Error occur', undefined);
        }else if(body.error) {
            callback('Place not found', undefined);
        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = {
    forecast
}

// request({ url: mapBoxUrl, json: true }, (error, response) => {
//     if(error) {
//         console.log('Error occur');
//     }else if(response.body.features.length == 0) {
//         console.log('Place not found')
//     }else{
//         const longtitude = response.body.features[0].center[0];
//         const latitude = response.body.features[0].center[1];
//         console.log(longtitude);
//         console.log(latitude);
    
//         const darkSkyUrl = 'https://api.darksky.net/forecast/1600a3bbe50258110dce265dc8ed9c70/'+latitude+','+longtitude+'?units=si';
        
//         request({ url: darkSkyUrl, json: true}, (error, response) => {
//             if(error) {
//                 console.log('Error occur');
//             }else if(response.body.error) {
//                 console.log('Place not found');
//             }else{
//                 console.log(response.body.currently.temperature);
//             } 
//         })

//     }
// })

// response.body -> body