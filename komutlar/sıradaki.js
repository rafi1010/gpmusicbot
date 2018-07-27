exports.run = async (client, message, args, ops) =>{

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('Şu Anda Bulunduğum Kanalda Herhangi Bir Müzik Çalmıyor.');

    let queue = fetched.queue;
    let nowPlaying = queue[0];

    let resp = `__**Oynatılan**__\n**${nowPlaying.songTitle}** -- *${nowPlaying.requester}*\n **Tarafından Eklendi** \n__**Sıradaki\n`;

    for (var i = 1; i < queue.length; i++) {
        resp += `**${i}. __${queue[i].songTitle}__** -- *${queue[i].requester}* **Tarafından Eklendi**\n`;
    }

    message.channel.send(resp);

}
