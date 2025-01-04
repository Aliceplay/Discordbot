//Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('../config.json');
//fs 用於讀取 寫入 刪除文件
const fs = require('fs');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
//collection 用於儲存、管理和操作 Discord.js 中的各種對象，鍵-值 形式儲存。
client.commands = new Collection();
client.commandArray = [];
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
// client.once(Events.ClientReady, readyClient => {
//     console.log(`Ready! Logged in as ${readyClient.user.tag}`);
// });

// client.on(Events.MessageCreate, message => {
//     // 當接收到消息時，如果消息是來自機器人本身，則返回
//     if (message.author.bot) return;
//     // 如果消息的內容是 '!ping'
//     if (message.content === prefix + 'ping') {
//         // 回覆消息，可用 message.channel.send('');傳送訊息
//         message.reply('Pong!');
//     }
// });
// client.on(Events.MessageDelete, message => {
//     // 如果有人刪除訊息就抓取下來，以下回傳用戶名和內容
//     console.log(`${message.author.username}刪除了${message.author.content}`);
// });
// client.on(Events.MessageUpdate, message => {
//     // 如果有人修改訊息就抓取下來，以下回傳用戶名和內容
//     console.log(`${message.author.username}更新了${message.author.content}修改成${message.reactions.message.content}`);
// });
client.handleEvents();
client.handleCommands();
// Log in to Discord with your client's token
client.login(token);