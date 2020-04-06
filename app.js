const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
var ballot = [];
var voters = [];
var ballotMessage = "";

client.voters = voters;
client.ballot = ballot;
client.ballotMessage = ballotMessage;

client.on("ready", () => {
  console.log(`ready!`);
});

client.on('message', (message) => {
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  fs.exists(`./commands/${command}.js`, (exists) => {
    if (exists) {
      let fetchCommand = require(`./commands/${command}.js`);
      fetchCommand.run(client, message, args);
    }
  });
});

client.login(config.token);
