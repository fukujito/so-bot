const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('`mod-log` kanalı nerede gerizekalı oç');
  if (reason.length < 1) return message.reply('Ulan gerizekalı ban sebebini yazsana.');
  if (message.mentions.users.size < 1) return message.reply('Aptal ilk önce kimi banlayacağını seçsene.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('Ulan aptal! Yetkiliyi banlayamazsın yetkisini düşür şunun.');
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Ban')
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', reason);
  return guild.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi banlar. (Yetkili Komudu)',
  usage: 'ban [kullanıcı] [sebep]'
};
