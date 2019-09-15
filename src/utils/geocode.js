const request = require('request')

const geocode = (address, callback) => {
    const urlMapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1Ijoic3VzaGFudHJhdG5hbSIsImEiOiJjazBhZmoxcm0waGl3M2NudmxvNHkxcDduIn0.vbWVLaOU1ncjl0G5_K49XA'
    request({
        url: urlMapbox,
        json: true
    }, (error, {
        body
    } ={} ) => {
        if (error) {
            callback('Unable to connect to weather server!', undefined)
        } else if (body.features.length === 0) {
            callback('Poorly formatted input string', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode