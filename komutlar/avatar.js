var Jimp = require('jimp');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  var user = message.mentions.users.first() || message.author;
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.glitch.com/f1894607-d337-489d-bdeb-0fd22e8e0430%2Fddostum.png?v=1590583293563", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/avatar/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/avatar/${bot.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Profil fotoğrafını chate atar.',
  usage: 'avatar'
};