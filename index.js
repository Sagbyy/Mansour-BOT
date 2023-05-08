const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandsFile = fs.readdirSync(commandsPath);

// Pour chaque commandes dans commandsFile
for (const folder of commandsFile) {
    const folderPath = path.join(commandsPath, folder);
    const commandFile = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js"));
    for (let file of commandFile) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);
        // Vérifie si elle dispose des propriétés data et execute
        if ("data" in command && "execute" in command) {
            // Si oui on enrengistre la commande dans le client
            client.commands.set(command.data.name, command);
            console.log(`[✅] La commande ${file} à été chargée !`);
        } else {
            console.log(
                `[⚠️] Alerte la commande dans ${filePath} manque soit 'data' ou 'execute' !`
            );
        }
    }
}

// Une fois tout chargé alors :
client.once(Events.ClientReady, (c) => {
    console.log(`Le bot est prêt sur ${c.user.tag}! `);
});

// Connection du bot
client.login(process.env.BOT_TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `Aucune commande ${interaction.commandName} à été trouvée.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }
});
