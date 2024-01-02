const fs = require("fs");
const path = require("path");
module.exports = async client => {
    fs.readdirSync(path.join(__dirname, "../events")).filter((file) => file.endsWith(".js")).forEach(file => {
        let event = require(`../events/${file}`);
        if(!event.name || typeof event.name !== "string") return console.log(`[⚠️] Event ${file} has no name.`)
        else if (!("name" in event) || !("execute" in event)) return console.log(`[⚠️] Event ${file} has no property called 'name' or 'execute'.`)
        else {
            console.log(`[✅ ] Event ${file} is loaded.`)
            client.on(event.name, event.execute.bind(null, client));
        }
    })
}
