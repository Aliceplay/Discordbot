const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands");
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                //console.log(`Command: ${command.data.name}has been passed through the handler`)
            }
        }
        const clientId = "885782572397920257";
        //const guildId="";只用於某特定伺服器
        const { token } = require('../config.json');
        const rest = new REST({ version: '9' }).setToken(token);
    }
    try {
        await command.execute(interaction, client);
        } catch (error) {
        console.error(error);
        await interaction.reply({
            content: `Something went wrong while executing this command...`,
            ephemeral: true
        });
    }
}