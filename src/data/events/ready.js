/* Import Configurations */
const Util = require("../util");
const config = Util.getConfig()[1];

var lang;
if(config.language=="ES"){
    lang = require("../languages/ES-es.json");
}else{
    lang = require("../languages/EN-en.json");
}

module.exports = async (client) => {
    console.log(lang.start.init + client.user.tag + "!");
    client.user.setStatus(config.status);
    client.user.setActivity(config.statusBot);
}