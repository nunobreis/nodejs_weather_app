const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');

const argv = yargs
.options({
  m: {
    demand: true,
    alias: 'morada',
    describe: 'Morada para saber meteorologia',
    sting: true
  }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.morada, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(results.address);
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(`A temperatura é neste momento de ${weatherResults.temperature}ºC.`);
          console.log(`A temperatura aparente é de: ${weatherResults.apparentTemperature}ºC`);
        }
      });
    }
});
