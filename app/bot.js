/* eslint-disable brace-style */
/* eslint-disable indent */
'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
require('dotenv').config();

client.on('ready', () => {
	console.log(`We are online and ready! Running on Client: ${client.user.tag}`);
	client.user.setActivity('CheekBot', {
		type: 'WATCHING',
	});
});

// Test Command

// client.on('message', message => {
//     if (message.author.bot || message.channel.type === 'dm') return;

//     const prefix = config.prefix;
//     const messageArray = message.content.split(' ');
//     const cmd = messageArray[0];
//     const args = messageArray.slice(1);

//     if (cmd === `${prefix}ping`) {
//         message.channel.send('Pong');
//     }
// });

// Main Section
client.on('message', async (message) => {
	if (message.author.bot || message.channel.type === 'dm') return;

	const prefix = config.prefix;
	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	// Test command
	if (cmd === `${prefix}test`) {
		return message.channel.send('Hello World');
	}

	// Clear/Prune Message Command
	if (cmd === `${prefix}clear`) {
		if (message.deletable) {
			message.delete();
		}
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			return (
				await message.reply('You do not have permission to use this command!')
			).attachments((m) => m.delete(5000));
		}

		if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
			return (
				await message.reply(
					`This is not an amount! **Example**: ${prefix}clear 50`,
				)
			).attachments((m) => m.delete(5000));
		}

		let deleteAmount;
		if (parseInt(args[0]) > 100) {
			deleteAmount = 100;
			// return (await message.reply('Message Deleted'));
		} else {
			deleteAmount = parseInt(args[0]);
			// return (await message.reply('Message Deleted'));
		}

		message.channel
			.bulkDelete(deleteAmount, true)
			.catch((err) =>
				message.reply(`Oops, Something went wrong, Try again!... ${err}`),
			);
	}

	// Test Command Again
	if (cmd == `${prefix}test1`) {
		message.channel.send(`Hello ${message.author.username}`);
	}

	if (cmd == `${prefix}help`) {
		const embed = new Discord.MessageEmbed();
		embed.setTitle('Test Title');
		embed.setColor('#fff');
		embed.addField('Player Name', message.author.username);
		embed.setDescription('Test Description');
		embed.setFooter('Thanks for testing this');
		return message.channel.send(embed);
	}
});

// Bot Token Console Log
// console.log(process.env.CLIENT_TOKEN);
client.login(process.env.CLIENT_TOKEN);