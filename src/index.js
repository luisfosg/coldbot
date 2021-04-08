require("./data/web/webhooks");

/* Dependence */
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Discord.Client();

/* Import Configurations */
const Util = require("./data/util");
const login = Util.getLogin()[1];

/* Command Bot */
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "data/commands")).filter(file => file.endsWith(".js"));
for(let file of commandFiles){
    const command = require(`./data/commands/${file}`);
    client.commands.set(command.name, command);
}

/* Events Bot */
const eventFiles = fs.readdirSync(path.join(__dirname, "data/events")).filter(file => file.endsWith(".js"));
for(let file of eventFiles){
    let nameFile = file.substring(0, file.length - 3);
    let contentsFile = require(`./data/events/${file}`);

    client.on(nameFile, contentsFile.bind(null, client));

    delete require.cache[require.resolve(`./data/events/${file}`)];
}

/* Logger with Discord Bot */
client.login(login.password);
