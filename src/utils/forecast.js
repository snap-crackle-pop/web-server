const request = require('request');

const forecast = (long, lat, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=adf6df4314f25590e9ddcc02a99ba8ed&query=${lat},${long}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to weather service');
        } else if (body.error) {
            cb('Unable to find location');
        } else {
            console.log(body.current);
            const {
                temperature,
                weather_descriptions,
                humidity,
                cloudcover,
                visibility,
            } = body.current;
            const forecast = `${weather_descriptions}, It is currently ${temperature} degrees.
            humidity: ${humidity}, cloud cover:${cloudcover}, visibility:${visibility} 
            `;
            cb(undefined, {
                forecast,
            });
        }
    });
};

module.exports = {
    forecast,
};
