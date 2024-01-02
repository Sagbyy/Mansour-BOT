const { Events } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports ={
    name: Events.GuildMemberAdd,
    once: true,
    execute(client, member){
        const { user } = member;

        const welcomeChannel = member.guild.systemChannel

        const welcomeMessage = `Assalamu alaykum wa rahmatullahi wa barakatuh ${user.username} ! Welcome to the Lossa server !`;

        const messageEmbed = new EmbedBuilder()
            .setTitle(welcomeMessage)
            .setThumbnail(user.displayAvatarURL())

        welcomeChannel.send({embeds: [messageEmbed]}).then(() => {
            console.log(`[✅] ${user.username} has joined the server !`)
        });
  }
}

// https://discord.gg/CzF8Uehn