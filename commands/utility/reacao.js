const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reacao')
        .setDescription('Envia uma mensagem com uma reação'),

    async execute(interaction) {
        // Envia uma mensagem inicial
        const message = await interaction.reply('Clique no emoji abaixo para enviar outra mensagem');

        // Adiciona uma reação à mensagem
        await message.react('😎');

        // Cria um filtro para coletar apenas reações de usuários específicos
        const filter = (reaction, user) => reaction.emoji.name === '😎' && !user.bot;

        // Cria um coletor de reações
        const collector = message.createReactionCollector({ filter, time: 15000 }); // Tempo em milissegundos (15 segundos)

        // Define o que acontece quando a reação é coletada
        collector.on('collect', async (reaction, user) => {
            // Envia outra mensagem quando a reação é coletada
            await interaction.channel.send(`O usuário ${user.username} clicou no emoji!`);
        });

        // Define o que acontece quando o coletor de reações termina
        collector.on('end', collected => {
            console.log(`Foram coletadas ${collected.size} reações.`);
        });
    },
};
