const { readdirSync } = require("fs");
const express = require("express");
const Discord = require("discord.js");

// Options
const app = express();
const client = new Discord.Client();

// Discord Collections
client.config = require("./config.js");
client.commands = new Discord.Collection();

// Web Page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Express Initiated.");
});

// Setting the Command Handler

// Commands
for (const file of readdirSync("./commands/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./commands/${file}`);
    client.commands.set(fileName, fileContents);
  }
}

// Events
for (const file of readdirSync("./events/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./events/${file}`);
    client.on(fileName, fileContents.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  }
}

// Bot initializer
client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("Discord Bot started. | Logged as " + client.user.tag);
  })
  .catch((err) => {
    console.error(err);
  });
