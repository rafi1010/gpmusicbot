// Require Packages - You will need to install these
const Discord = require('discord.js');
const client = new Discord.Client();

// Constant Variables
const prefix = '..'
const ownerID = '305112912429580288'
const active = new Map();

const serverStats = {
    guildID: '348180163881730048',
    totalUsersID: '472172327107297290',
    memberCountID: '472172505637978123'
};

// Listener Events
client.on('message', message => {

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Return Statements
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Command Handler
    try {

        // Bonus
        delete require.cache[require.resolve(`./komutlar/${cmd}.js`)]

        // Options
        let ops = {
          ownerID: ownerID,
          active: active

        }

        let commandFile = require(`./komutlar/${cmd}.js`)
        commandFile.run(client, message, args, ops);

    } catch (e) {
        console.log(e.stack);
    }

});

client.on('ready', () => console.log('Başlatıldı.'));

client.on('guildMemberAdd', member =>{

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.memberCount}`);

});

client.on('guildMemberRemove', member =>{

      if (member.guild.id !== serverStats.guildID) return;

      client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı : ${member.guild.memberCount}`);
      client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.memberCount}`);

});

client.login(process.env.BOT_TOKEN);
