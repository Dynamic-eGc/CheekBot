/* eslint-disable indent */
/* eslint-disable no-unused-vars */
module.exports = {
    name: 'ping',
    description: 'says ping!',
    execute(message, args) {
        message.channel.send('Ping');
    },
};