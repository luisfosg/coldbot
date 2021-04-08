const util = require("../util");
const config = util.getConfig()[1];

module.exports = {
    name: "prefix",
    alias: ["p", "pre"],
    description: "change prefix",
    execute: (client, msg, args) => {
        if(util.checkArgs(args)){
            if(args[0]==="set"){
                set(client, msg, args);
            }else if(args[0]==="reset"){
                reset(client, msg, args);
            }else if(args[0]==="help"){
                help(client, msg, args);
            }else{
                util.sendMsg(msg, "The command does not exist");
            }
        }else{
            msg.reply("The Prefix is: '"+config.prefix+"'");
            util.sendMsg(msg, "To more use "+config.prefix+"p help");
        }
    },
};

function set(client, msg, args){
    if(util.isManage(msg)){
        let numArgs = util.countArgs(args);
        numArgs--;
        if(numArgs>1){
            if(args[2]==="?"){
                tempPrefix = args[1]+" ";
            }else{
                tempPrefix = args[1]+" "+args[2];
            }
        }else{
            tempPrefix = args[1];
        }
        util.sendMsg(msg, "changing the prefix to: '"+tempPrefix+"'");
    }else{
        util.sendMsg(msg, "You do not have the necessary permissions");
    }
}

function reset(client, msg, args){
    if(util.isManage(msg)){
        util.sendMsg(msg, "changing the prefix to: '> '");
    }else{
        util.sendMsg(msg, "You do not have the necessary permissions");
    }
}

function help(client, msg, args){
    util.sendMsg(msg, "To change the prefix use "+config.prefix+"p set (new prefix)");
    util.sendMsg(msg, "If you want to leave a space in the prefix put '(your prefix) ?'");
}
