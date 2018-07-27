exports.run = (client, message, args, ops) =>{

    if (message.author.id !== ops.ownerID) return message.channel.send('Üzgünüm.Sadece Yapımcım Bu Komutu Kullanabilir');

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('Bu Ses Kanalında Herhangi Bir Video Oynatılmıyor!');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Afedersin, Botla Aynı Kanalda Değilsin.');

    if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('Lütfen, 0 İle 200 Arasında Bir Sayı Gir!');

    fetched.dispatcher.setVolume(args[0]/20);

    message.channel.send(`${fetched.queue[0].songTitle} İsimli Müziğin Sesi Başarıyla ${args[0]} Yapıldı.`);

}
