const request = require('request');

const forecast = (lat, long, callback) => {
	const url = "https://api.darksky.net/forecast/96cb7185725f81dec0ada580fcd87371/"+encodeURIComponent(lat)+","+encodeURIComponent(long);
	request({url: url, json: true}, (error, {body}) => {
		if(error){
			callback("Unable to connect to weather service.", undefined);
		} else if (body.error) {
			callback("Unable to find location, enter a new lat and long.", undefined)
		} else {
			callback(undefined, {
				summary: body.daily.data[0].summary,
				temp: body.currently.temperature,
				precipProb: body.currently.precipProbability
			})
		}
	});

}


module.exports = forecast;