const Discord = require("discord.js")
const { Routes } = require("discord-api-types/v10")
const fs = require("fs");
const path = require("path");

module.exports = async client => {
    let commands = []
    fs.readdirSync(path.join(__dirname, "../commands")).forEach(folder => fs.readdirSync(path.join(__dirname, `../commands/${folder}`)).filter((file) => file.endsWith(".js")).forEach(file => {
        let command = require(`../commands/${folder}/${file}`);
        if(!command.data.name || typeof command.data.name !== "string") return console.log(`[⚠️] Command ${file} has no name.`)
        else if (!("data" in command) || !("execute" in command)) return console.log(`[⚠️] Commande ${file} has no property called 'data' or 'execute'.`)
        else {
            console.log(`[✅ ] Commande ${file} is loaded.`)
            commands.push(command.data)
            client.commands.set(command.data.name, command);
        }
    }))

    // Construct and prepare an instance of the REST module
    const rest = new Discord.REST().setToken(process.env.BOT_TOKEN);

    // and deploy your commands!
    try {
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }

}
