const request = require('request');

const forecast = (long, lat, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=adf6df4314f25590e9ddcc02a99ba8ed&query=${lat},${long}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to weather service');
        } else if (body.error) {
            cb('Unable to find location');
        } else {
            const { temperature, weather_descriptions } = body.current;
            const forecast = `${weather_descriptions}, It is currently ${temperature} degrees`;
            cb(undefined, {
                forecast,
            });
        }
    });
};

module.exports = {
    forecast,
};
