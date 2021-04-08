module.exports ={
    getLogin: function(){
        let login = "../private/login.js";
        return [login, require(login)];
    },
    getConfig: function(){
        let config = "./config.js";
        return [config, require(config)];
    },
    sendMsg: function(client, msg){
        client.channel.send(msg);
    },
    checkArgs: function(args){
        if(args[0] === undefined){
            return false;
        }else{
            return true;
        }
    },
    countArgs: function(args){
        return args.length;
    },
    isAdmin: async function(msg){
        let perms = await msg.member.permissions;
        if(perms.has("ADMINISTRATOR")){
            return true;
        }else{
            return false;
        }
    },
    isManage: async function(msg){
        let perms = await msg.member.permissions;
        if(perms.has("MANAGE_SERVER")){
            return true;
        }else{
            return false;
        }
    }
}