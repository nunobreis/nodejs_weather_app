const request = require('request');

const geocodeAddress = (morada) => {
  return new Promise((resolve, reject) => {
    const geocodeAddress = (morada, callback) => {
      const encodedAddress = encodeURIComponent(morada);

      request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject('Não foi possível conectar com os servidores da Google');
         } else if (body.status === 'ZERO_RESULTS') {
           reject('Upps! Não foi possível encontrar essa localização');
         } else if (body.status === 'OK') {
           resolve({
             address: body.results[0].formatted_address,
             latitude: body.results[0].geometry.location.lat,
             longitude: body.results[0].geometry.location.lng
           });
         }
      });
    };
  });
};

geocodeAddress('1900-317').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}).catch((errorMessage) => {
  console.log(errorMessage);
});
