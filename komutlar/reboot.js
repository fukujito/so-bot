const Discord = require('discord.js');

exports.run = (client, message, args) => {
	
    message.channel.send(`See you motherfuckersssss...`).then(msg => {
    console.log(`BOT: Restart...`);
    process.exit(0);
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'reboot',
  description: 'Botu yeniden başlatır. (Yetkili Komudu)',
  usage: 'reboot'
};
