const Discord = require('discord.js');
const login = require("../../private/login");

const hook = new Discord.WebhookClient(login.webhookId, login.webhookToken);

hook.send('I am now alive!');
