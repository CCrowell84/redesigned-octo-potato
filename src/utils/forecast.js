const request = require('request');

const forecast = (lat, long, callback) => {
	const url = "https://api.darksky.net/forecast/96cb7185725f81dec0ada580fcd87371/"+encodeURIComponent(lat)+","+encodeURIComponent(long);
	request({url: url, json: true}, (error, {body}) => {
		if(error){
			callback("Unable to connect to weather service.", undefined);
		} else if (body.error) {
			callback("Unable to find location, enter a new lat and long.", undefined)
		} else {
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees outside. There is a ' + body.currently.precipProbability + '% chance of rain today.')
		}
	});

}


module.exports = forecast;