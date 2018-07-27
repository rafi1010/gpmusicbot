// This command leaves a voiceChannel, if it is connected to one

exports.run = (client, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send('Lütfen Bir Ses Kanalına Gir!');

    if (!message.guild.me.voiceChannel) return message.channel.send('Bot Hiç Bir Ses Kanalında Değil!');

    if (!message.guild.me.voiceChannelID) return message.channel.send('Kusura Bakma, Hiçbir Ses Kanalında Değilsin!');

    message.guild.me.voiceChannel.leave();

    message.channel.send('Kanaldan Ayırlıyorum...')

}
