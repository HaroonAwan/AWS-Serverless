const moment = require('moment');

const greetings = {
    "en": "Hello",
    "ar": "AOA",
    "es": "Hola",
    "fr": "Bonjour"
};

exports.handler =async (event) => {
    const name = event.pathParameters.name;
    const {lang} = event.queryStringParameters;

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `${greetings[lang] ? greetings[lang] : greetings["en"]} ${name}`,
            timestamp: moment().unix()
        })
    };
}