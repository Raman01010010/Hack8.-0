const accountSid = process.env.TSID;
const authToken = process.env.TAUTH;
const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'raman',
//         from: '+12563447753',
//         to: '+918053842320'
//     })
//     .then(message => {
//         console.log(message.sid);
//         console.log("rama");
//     })
//     .catch(error => console.error(error));
module.exports={client}