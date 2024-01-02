const { Client, Collection } = require("discord.js");
const cron = require("node-cron");
const sendHadith = require("./features/dailyHadith");
const loadCommands = require("./utils/deploy_commands");
const loadEvents = require("./utils/deploy_events");

require("dotenv").config();

const client = new Client({
    intents: 3276799
});

client.commands = new Collection();

// Chargement des commandes
loadCommands(client).then(() => {
    console.log("All commands are loaded !");
});

// Chargement des events
loadEvents(client).then(() => {
    console.log("All events are loaded !");
});

// Connection du bot
client.login(process.env.BOT_TOKEN);

// Send hadith every minute
cron.schedule("0 8 * * *", () => {
    sendHadith(client);
});