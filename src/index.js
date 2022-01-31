const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const config = require("./config.json");
const upload = require("./helpers/upload");

client.login(config.botToken);

client.on("ready", () => {
  if (config.authedUsers.length === 0) throw new Error("No users defined");
  if (!config.uploadChannel) throw new Error("No upload channel specified");
  if (!config.baseURL) throw new Error("No base URL specified");

  console.log("Online");
});

client.on("messageCreate", async (message) => {
  if (!message.guildId || message.author.bot) return;
  if (message.channelId !== config.uploadChannel) return;

  const user = config.authedUsers.find(
    (u) => u.discordID === message.author.id
  );

  if (!user) return;
  if (!user.assToken)
    throw new Error(
      `User ${message.author.username}(${message.author.id}) has no token specified`
    );
  if (message.attachments.length === 0) return;

  const attachment = message.attachments.first();

  const result = await upload(user, message.content, attachment, config);
  return message.channel.send(result);
});
