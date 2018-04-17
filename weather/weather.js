const request = require('request');

const getWeather = (lat, lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/610d0f3812dd0c287ef01d1d101d2b35/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: Math.floor((body.currently.temperature - 32) / 1.8),
        apparentTemperature: Math.floor((body.currently.apparentTemperature - 32) / 1.8)
      })
    } else {
      callback('Ocorreu um problema ao tentar obter a sua informação.');
    }
  });
}

module.exports.getWeather = getWeather;
