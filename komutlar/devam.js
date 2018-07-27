exports.run = (client, message, args, ops) =>{

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('Bu Ses Kanalında Herhangi Bir Video Oynatılmıyor!');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Afedersin, Botla Aynı Kanalda Değilsin.');

    if (!fetched.dispatcher.resume) return message.channel.send('Müzik Zaten Çalıyor.');

    fetched.dispatcher.resume();

    message.channel.send(`${fetched.queue[0].songTitle} İsimli Müzik ${message.author.id} Tarafından Tekrar Başlatıldı.`);

}
