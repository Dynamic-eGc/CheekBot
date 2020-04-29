/* eslint-disable brace-style */
/* eslint-disable indent */
'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require('./colors.json');
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

	// Server Ifno
	if (cmd == `${prefix}serverinfo`) {
		const embed = new Discord.MessageEmbed();
		embed.setTitle('Server Info');
		embed.setThumbnail(message.guild.iconURL);
		embed.setAuthor(`${message.guild.name} info`, message.guild.iconURL);
		embed.setColor(colors.discord);
		embed.setDescription(`${message.guild.id}, ***${message.guild.owner.displayName}***`);
		embed.addField('**Guild Name**', `${message.guild.name}`, true);
		embed.addField('**Guild Owner**', `${message.guild.owner}`, true);
		embed.addField('**Member Count**', `${message.guild.memberCount}`, true);
		embed.setFooter(`Current server Infomation for ${message.guild.name}`);
		message.channel.send({
			embed: embed,
		});
	}

	//User Info
	if (cmd == `${prefix}userinfo`) {
		const embed = new Discord.MessageEmbed();
		embed.setTitle('Member Information');
		embed.setThumbnail(message.guild.iconURL);
		embed.setAuthor(`${message.guild.name} info`, message.guild.iconURL);
		embed.setColor(colors.discord);
		embed.setDescription(`${message.guild.id}, ***${message.guild.owner.displayName}***`);
		embed.addField('**Username**', `${message.author.username}#${message.author.discriminator}`, true);
		embed.addField('**ID**', `${message.author.id}`, true);
		embed.addField('**Status**', `${message.author.presence.status}`, true);
		embed.setFooter('Current server Infomation for', client.user.displayAvatarURL);
		message.channel.send({
			embed: embed,
		});
	}


});

// Bot Token Console Log
// console.log(process.env.CLIENT_TOKEN);
client.login(process.env.CLIENT_TOKEN);