const util = require("../util");

module.exports = {
    name: "help",
    alias: ["h"],
    description: "Pruebas",
    execute: (client, msg, args) => {
        util.sendMsg(msg, "<@"+client.user.id+">");
        util.sendMsg(msg, "Aun No tenemos ayudas xD");
    },
};
