module.exports ={
    name: 'interactionCreate',
    once:true,
    async execute(interaction,client){
        if(interaction.isChatInputCommand()){
            const{Commands}=client;
            const{commandName}=interaction;
            const command = Commands.get(commandName);
            if(!command)return;
            try{
                await command.execute(interaction,client);
            }catch(error){
                console.error(error);
                await interaction.reply({
                    content:`Something went wrong while executing this command...`,
                    ephemeral:true
                });
            }
        }
    },
};