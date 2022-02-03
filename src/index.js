const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const config = require("./config.json");
const validateConfig = require("./helpers/validateConfig");
validateConfig(config);

const upload = require("./helpers/upload");

client.login(config.botToken);

client.on("ready", () => {
  console.log("Online");
});

client.on("messageCreate", async (message) => {
  if (!message.guildId || message.author.bot) return;
  if (message.channelId !== config.uploadChannel) return;

  const user = config.authedUsers.find(
    (u) => u.discordID === message.author.id
  );

  if (!user) return;
  if (message.attachments.length === 0) return;

  const attachment = message.attachments.first();

  const result = await upload(user, message.content, attachment, config);
  return message.channel.send(result);
});
