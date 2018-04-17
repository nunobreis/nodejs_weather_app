const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoCodeURL).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Não foi possível encontrar essa morada.');
  }

  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  const weatherUrl = `https://api.darksky.net/forecast/610d0f3812dd0c287ef01d1d101d2b35/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Neste momento a temperatura é: ${temperature}.`);
  console.log(`Sente-se como: ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Impossível conectar com o API do servidor.');
  } else {
    console.log(e.message);
  }
});
