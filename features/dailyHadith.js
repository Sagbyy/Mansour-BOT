const { EmbedBuilder } = require("discord.js");

module.exports = function sendHadith(client) {
    const numberOfHadith = 10000;
    fetch(`https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$kpe7rx4HsV4CbTGxUmo446zRmPf88KELopdBM7vK1lTkrW8f7u&paginate=${numberOfHadith}`)
        .then(res => res.json())
        .then(data => {
            console.log("Hadith of the day")
            console.log("Random number : " + Math.floor(Math.random() * numberOfHadith))
            let hadith = data.hadiths.data[Math.floor(Math.random() * numberOfHadith)];

            let embed = new EmbedBuilder()
                .setColor("#017F01")
                .setTitle(`Hadith of the day`)
                .setDescription(`${hadith.hadithEnglish}`)
                .setTimestamp()
                .setFooter({text: `Chapter ${hadith.chapter.chapterNumber} ${hadith.chapter.chapterEnglish} | ${hadith.book.bookName}`, iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/KutubHadeethSittah.jpg/300px-KutubHadeethSittah.jpg"});

            client.channels.cache.get("1191533709728436337").send({ embeds: [embed] });
        })
        .catch(err => console.log(err));
}