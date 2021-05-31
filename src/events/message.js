module.exports = (client, message) => { 
const Discord = require('discord.js')
if(!message.content.startsWith(client.config.prefix)) return; 
if(message.author.bot) return;
const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);  
const command = args.shift().toLowerCase()
let cmd = client.commands.get(command);
if(!cmd) return;

// Options that are exported to your commands
cmd(client, message, args, Discord);
}