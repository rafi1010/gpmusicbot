exports.run = (client, message, args, ops) => {

    if (message.author.id !== ops.ownerID) return message.channel.send('Üzgünüm.Sadece Yapımcım Bu Komutu Kullanabilir');

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
        return message.channel.send(`Komutlar Yüklenemiyor ${args[0]}`);
    }

    message.channel.send(`Komut Başarıyla Yüklendi ${args[0]}`);
}
