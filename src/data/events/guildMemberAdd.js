const Util = require("../util");
const config = Util.getConfig()[1];

module.exports = async (client, member) => {
    const channelInto = config.channelWelcome;
    const message = `Welcome ${member} to the server!`;

    const channel = client.channels.cache.get(channelInto);
    if (!channel) return;
    channel.send(message);
}
