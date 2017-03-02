const http = require('http');
exports.getSunrise = function getSunrise(cb) {
    var ip = "";
    getLocation(cb);
}

function getLocation(cb) {
    var options = {
        host: 'freegeoip.net',
        port: 80,
        path: '/json/',
        method: 'GET'
    }

    http.request(options, function(res){
        var body = "";

        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function(){
            var result = JSON.parse(body),
                lat,
                long;
            lat = result.latitude;
            long = result.longitude;
            getSunriseAPI(cb, lat, long);
        });
    }).end();
}

function getSunriseAPI(cb, lat, long) {
    var options = {
        host: 'api.sunrise-sunset.org',
        port: 80,
        path: '/json?lat='+lat+'&lng='+long,
        method: 'GET'
    }

    http.request(options, function(res){
        var body = "";

        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function(){
            var result = JSON.parse(body);
            cb(null, 'SUNRISE IS AT ' + result.results.sunrise + ' UTC');
        });
    }).end();
}