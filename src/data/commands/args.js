const util = require("../util");

module.exports = {
    name: "args",
    alias: ["a", "ar"],
    description: "Write the Args",
    execute: (client, msg, args) => {
        if(util.checkArgs(args)){
            msg.channel.send("Not Args");
        }else{
            msg.channel.send("arguments: "+util.countArgs(args));
        }
    },
};
