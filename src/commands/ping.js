module.exports = (client, message, args, Discord) => {
let ping = Math.floor(message.client.ws.ping)

message.channel.send({embed: {
    color: 'RANDOM',
    description: `${ping}ms`
}});

}