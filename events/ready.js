const { Events, ActivityType } = require("discord.js");

// Une fois tout chargé alors :
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Le bot est prêt sur ${client.user.tag}! `);
        client.user.setActivity({
            name: "Dev by @sagby",
            type: ActivityType.Custom,
        })

        client.user.setStatus("dnd")
    },
};
