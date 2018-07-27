exports.run = async (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send('Bu Ses Kanalında Herhangi Bir Video Oynatılmıyor!');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Afedersin, Botla Aynı Kanalda Değilsin.');

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount/2);

    if (message.member.hasPermission(`ADMINISTRATOR`)) {

      message.channel.send(`Oynatılan Video/Şarkı Yetkili Tarafından Sonlandırıldı.`);

      return fetched.dispatcher.emit(`end`);

    }

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    if (!fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Afedersin, Zaten Oyunu Kullandın! ${fetched.queue[0].voteSkips.length}/${required} Oy Gerekli`);

    if (fetched.queue[0].voteSkips.length >= required) {

        message.channel.send(`Oylar Sonucunda Şarkı Başarıyla Sonlandırıldı!`);

        return fetched.dispatcher.emit('end');
    }

    message.channel.send(`Başarıyla Oyladın! ${fetched.queue[0].voteSkips.length}/${required} Oy Gerekli.`);

}
