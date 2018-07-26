// This command requires 1 module: yt-search
//`npm i yt-search`
// Require package
const search = require('yt-search')

exports.run = (client, message, args, ops) => {

    // Search for videos based on the arguements
    search(args.join('  '), function(err, res) {
        // Error Handling
        if(err) return message.channel.send('Üzgünüm, Bir Hata Gerçekleşti.')

        // First, we only want to use the first ten results
        let videos = res.videos.slice(0, 5) // Obviously, you can change This

        // Then, loop them to create an output string
        let resp = '';
        for (var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }

        //Then, add some more text info instructions
        resp +=`\n\`1-${videos.length}\`Arasında bir sayı seçin.`;

        // Send output
        message.channel.send(resp);

        // Then, we can create a message collector
        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content >0
        // This is a filter, it will only accept text that is a number between the set range earlier
        const collector = message.channel.createMessageCollector(filter);

        // Update collector variables
        collector.videos = videos;

        // Create a listener event
        collector.once('collect', function(m){

          // Run `play` command, passing in the url as agrs[0]
          let commandFile = require(`./oynat.js`); //we aren't specifying the /commands folder since we are already there with search.js
          commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
        });
    });
}
