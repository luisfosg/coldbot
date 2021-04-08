/* Import Configurations */
const Util = require("../util");
const config = Util.getConfig()[1];

var lang;
if(config.language=="ES"){
    lang = require("../languages/ES-es.json");
}else{
    lang = require("../languages/EN-en.json");
}

const PREFIX = config.prefix;

module.exports = async (client, msg) => {
    if (msg.author.bot) return;

    if(msg.content.startsWith("<@!"+client.user.id+">")){
        Util.sendMsg(msg, "Hi, The Prefix is '"+PREFIX+"', use: "+PREFIX+"h");
    }

    if (msg.content.startsWith(PREFIX)) {
        const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
        let CMD = args.shift().toLowerCase();

        /* Alias Commands */
        if(client.commands.find((c) => c.alias.includes(CMD))){
            let com = client.commands.find((c) => c.alias.includes(CMD));
            CMD = com.name;
        }

        /* List Commands */
        if(!client.commands.has(CMD)){
            msg.channel.send(lang.error.notCommand);
            return;
        };

        /* Eject Command */
        try{
            client.commands.get(CMD).execute(client, msg, args);
        }catch(e){
            console.error(e);
            msg.reply(lang.error.catch);
        }
    }
}