const cors = require('cors');

const allowedOrigin = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:3000/',
    'http://localhost:5000/',
    'https://whispering-hamlet-08619.herokuapp.com/',
    'https://whispering-hamlet-08619.herokuapp.com',
    'https://compassionate-shockley-c03462.netlify.app/',
    'https://compassionate-shockley-c03462.netlify.app'
];

exports.corsConfig = {
    origin: (origin, cb) => {
        if(!origin) return cb(null, true);
        if(allowedOrigin.indexOf(origin) === -1) {
            return cb(new Error(`THe origin ${origin} is not allowed to call the askookie API`), false);
        }
        return cb(null, true);
    }
};

exports.cors = cors;