const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1IjoieW9nZXNoa3VtYXIwIiwiYSI6ImNraGwxZXlqdjFtbGwyeW85aDVpaTlwMG4ifQ.Guu7a1dBsK88L2AnPhVH1g&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('could not get data from service', undefined);
        } else if (body.features.length === 0) {
            callback('No recs returned', undefined);
        } else {
            const [longituide, latitude] = body.features[0].center;
            const location = body.features[0].place_name;
            callback(undefined, { longituide, latitude, location });
        }
    });
};

module.exports = {
    geocode,
};
