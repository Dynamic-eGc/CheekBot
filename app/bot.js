'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
    console.log('We are online and ready!');
});

client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong');
    }
});

// client.on('disconnect', message => {
//     if (message.content === '!off') {
//         client.destroy();
//     }
// });


// console.log(process.env.CLIENT_TOKEN);
client.login(process.env.CLIENT_TOKEN);