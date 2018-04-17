const request = require('request');

const geocodeAddress = (morada, callback) => {
  const encodedAddress = encodeURIComponent(morada);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Não foi possível conectar com os servidores da Google');
     } else if (body.status === 'ZERO_RESULTS') {
       callback('Upps! Não foi possível encontrar essa localização');
     } else if (body.status === 'OK') {
       callback(undefined, {
         address: body.results[0].formatted_address,
         latitude: body.results[0].geometry.location.lat,
         longitude: body.results[0].geometry.location.lng
       });
     }
  });
};

module.exports.geocodeAddress = geocodeAddress;
