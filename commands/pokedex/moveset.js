const { EmbedBuilder } = require('discord.js');


async function handleMoveset(embedEnviado, poke_name, pokemon, poke_data, interaction) {

    //Lógica Moveset
    let poke_Moves = poke_data.moves
    .filter(poke_Move => 
        poke_Move.version_group_details &&
        poke_Move.version_group_details[0] && 
        poke_Move.version_group_details[0].move_learn_method && 
        poke_Move.version_group_details[0].move_learn_method.name === "level-up"
    )
    .map(poke_Move => poke_Move.move.name);


    const filter = (interaction) => interaction.customId === 'moveset';
    const collector = embedEnviado.createMessageComponentCollector({ filter });
    
    const pokedex_moveset = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`Moveset do ${poke_name}`)
        .setDescription(`${poke_Moves}`)

    collector.on('collect', async () => {
        await embedEnviado.edit({ embeds: [pokedex_moveset], components: [] });
        

        return poke_Moves
    });
}

module.exports = { handleMoveset };
