const util = require("../util");
const Discod = require("discord.js");

module.exports = {
    name: "profile",
    alias: ["pro"],
    description: "Command Profile",
    execute: (client, msg, args) => {
        let dataUser = msg.mentions.members.first() || msg.member;

        let embed = new Discod.MessageEmbed();
        embed.setColor("RANDOM");
        embed.setImage(dataUser.user.displayAvatarURL());
        embed.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL());
        embed.setTitle(dataUser.user.username+"#"+dataUser.user.discriminator);
        embed.setTimestamp(Date.now());

        data = [
            {
                "name": "Hello",
                "value": "Hello World",
                "inline": true
            },
            {
                "name": "Hola",
                "value": "Hola Mundo",
                "inline": true
            }
        ];

        embed.addFields(data);

        if(dataUser.user.bot){
            embed.setFooter("Bot");
        }else{
            embed.setFooter("Human");
        }

        util.sendMsg(msg, embed);
        msg.delete();
    },
};
