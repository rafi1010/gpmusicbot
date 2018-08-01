// This Command will require 2 NPM packages
// `npm i ytdl-core node-opus`
const ytdl = require('ytdl-core');

// You can use your own command handler if you like
exports.run = async (client, message, args, ops) => {

    // First, we need to check if the author is connected to a voice channel
    if (!message.member.voiceChannel) return message.channel.send('Lütfen Herhangi Bir Ses Kanalına giriş Yap!');
    // If not, return & send message to chat

    // Check if author input a url
    if (!args[0]) return message.channel.send('Pardon, Komuttan Sonra Lütfen Geçerli Bir Url Gir!');

    // Validate Info
    let validate = await ytdl.validateURL(args[0]);

    // Check Validation
    if (!validate) {

      let commandFile = require(`./yt-ara.js`);
      return commandFile.run(client, message, args, ops);
    }


    let info = await ytdl.getInfo(args[0])

    // Essentially, everything under the validate statement will be changed

    // First, we need to fetch the active -- Also if it's not defined it will be hold {}
    let data = ops.active.get(message.guild.id) || {};

    // Next, we need to update the data
    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
      songTitle: info.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id
    });

    if (!data.dispatcher) playStream(client, ops, data);
    else {// Although, if there is already a dispatcher, run this

        // Send added to queue message
        message.channel.send(`Sıraya Eklenen: ${info.title} | ${message.author.tag} Tarafından `);

    }

    // Finally, update the Map
    ops.active.set(message.guild.id, data);

}

async function playStream(client, ops, data) {

    // First, we can send the now playing message
    client.channels.get(data.queue[0].announceChannel).send(`Oynatılan: ${data.queue[0].songTitle} | ${data.queue[0].requester} Tarafından`);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url,{ filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function(){

        end(client, ops, this);
    });
}

function end(client, ops, dispatcher) {

    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetched);

        playStream(client, ops, fetched);

    } else {

        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave();



    }
}
