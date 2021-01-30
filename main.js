const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const moment = require("moment");
const app = express();
const http = require('http');
require("moment-duration-format");
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
app.use(express.static('public'));
app.listen(80) //WEB PORT -- HTTP Default Port= 80
app.get('/api', (request, response) => {
const duration = moment.duration(client.uptime).format(" D [Day], H [Hour], m [Munite], s [Second]");
 response.json({
  name: client.user.tag,
  id: client.user.id,
  servers: client.guilds.cache.size,
  users: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
  channels: client.channels.cache.size,
  uptime: duration,
  ping: client.ws.ping,
  djsversion: Discord.version,
  nodejsversion: process.version
})
});
 
client.login('DISCORD_BOT_TOKEN'); //BOT TOKEN