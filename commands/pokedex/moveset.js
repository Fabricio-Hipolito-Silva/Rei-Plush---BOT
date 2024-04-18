const { EmbedBuilder } = require('discord.js');

async function handleMoveset(embedEnviado, poke_name) {
    const filter = (interaction) => interaction.customId === 'moveset';
    const collector = embedEnviado.createMessageComponentCollector({ filter });
    
    const pokedex_moveset = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`Moveset do ${poke_name}`);

    collector.on('collect', async () => {
        await embedEnviado.edit({ embeds: [pokedex_moveset], components: [] });
    });
}

module.exports = { handleMoveset };
