// This command leaves a voiceChannel, if it is connected to one

exports.run = (client, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel');

    if (!message.guild.me.voiceChannel) return message.channel.send('Sorry, Bot isn\'t connected to the guild.');

    if (!message.guild.me.voiceChannelID) return message.channel.send('Sorry, You aren\'t connected to the guild.');

    message.guild.me.voiceChannel.leave();

    message.channel.send('Leaving Channel...')

}
