const Discord = require('discord.js');
const bot = new Discord.Client();

const botToken = "Mjc1MTk3NDMzMTY2ODIzNDI0.C29JLw.qN8_PNDm4aaA2Pc92p8xZAUuq4w";
var voiceChannel;
var textChannel;
var voiceConnection;
var messages;
var adminRole;
var adminUsers;

bot.on('ready' , function() {
	var guild = bot.guilds.array();
	voiceChannel = guild[0].channels.filter(function(g) {
		return g.type == 'voice' && g.name== 'voice'
		}).first();
	textChannel = guild[0].channels.filter(function(i)  {
		return i.type == 'text' && i.name == 'debug'
		}).first();	
		
	adminRole = guild[0].roles.filter(function(role) {
		return role.name == 'admin'
		}).first();
		
	adminUsers = adminRole.members;
	
	voiceChannel.join()
	.then(function(vConnection) {
		voiceConnection = vConnection;
		voiceConnection.playFile('whatsap.mp3');
		});
});

bot.on('message', function(message) {
	if(!message.author.bot) {
		if(message.content == '!leave') {
			voiceConnection = undefined;
			voiceChannel.leave();
		}
		if(message.content =='!join')  {
			voiceChannel.join()	
			.then(function(vConnection) {
				console.log(voiceConnection);
				if(!voiceConnection) {
					voiceConnection = vConnection;
					voiceConnection.playFile('whatsap.mp3');
				}

			});
		}
		if(message.content == '!shiet') {
			voiceConnection.playFile('soshiet.mp3');
		}
		if(message.content == '!whatsap'){
			voiceConnection.playFile('whatsap.mp3');
		}	
		if(message.content == '!kjeh') {
			//console.log("kjeh");
			voiceConnection.playFile('kjeh.mp3');
		}	
		if(message.content == '!clearchat') {
			var user = message.author;
			
			var foundUser = adminUsers.filter(function(gu) {
				return gu.user == user
			});
			if(foundUser) {
				messages = textChannel.messages;
				var toDelete = messages.filter(function(message) {
					return message.content == '!shiet'
				}); 
				textChannel.bulkDelete(100);
				/*messages.last().delete()
				.then(function(msg) {
				console.log("xd");
				})
				.catch(console.error);*/
			
			}

		}
		if(message.content == '!ding') {
			voiceConnection.playFile('ld-ding.mp3');
		}
		if(message.content == '!bsj') {
			voiceConnection.playFile('bsj.mp3');
		}
	}
});

bot.login(botToken);


