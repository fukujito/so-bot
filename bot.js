const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('Selaaam, hoş geldin!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('as .s ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'azra kim') {
    msg.reply(' Dünyanın en güzel en tatlı en şımarık en akıllı en komik ve eğlenceli arkadaşı... ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'yiğit kim') {
    msg.reply(' kocan');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'slm') {
    msg.reply('Hoş geldin .s :)');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ohayo') {
    msg.reply('Ohayooo');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'günaydın') {
    msg.reply('Günaydın dostum!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'çay') {
    msg.reply(' efendim ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'akıllı çay bardağı') {
    msg.reply(' ben cahilim aq ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hentai') {
    msg.reply(' https://discord.gg/SrTyH8h (Şu yeşil tuşa tıkla) ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'yaoi') {
    msg.reply(' https://discord.gg/qNtVZws (Şu yeşil tuşa tıkla) ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '1+1') {
    msg.reply(' bu soruyu bilemeyen aklını sikeyim. Tabii ki 6 aq ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'avatar') {
    msg.reply(' {user.avatar_url} ');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
