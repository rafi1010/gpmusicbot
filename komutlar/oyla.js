exports.run = async (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('There currently isn\'t any music playing in the guild!');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Sorry, you currently aren\'t in the same channel as the bot!');

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount/2);

    if (message.member.hasPermission(`MANAGE_MEMBERS`)) {

      message.channel.send(`Ended Song`);

      return fetched.dispatcher.emit(`end`);

    }

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    if (!fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry, you already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required`);

    if (fetched.queue[0].voteSkips.length >= required) {

        message.channel.send(`Succesfully Skipped Song!`);

        return fetched.dispatcher.emit('end');
    }

    message.channel.send(`Succesfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required`);

}
