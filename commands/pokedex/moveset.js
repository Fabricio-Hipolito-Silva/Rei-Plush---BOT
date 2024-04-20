    const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');


    async function handleMoveset(embedEnviado, poke_name, pokemon, poke_data, interaction) {

        //Lógica Moveset
        let poke_Moves = poke_data.moves.filter(poke_Move => 
            poke_Move.version_group_details &&
            poke_Move.version_group_details[0] && 
            poke_Move.version_group_details[0].move_learn_method && 
            poke_Move.version_group_details[0].move_learn_method.name === "level-up"
        ).map(poke_Move => poke_Move.move.name);
                


        const filter = (i) => i.customId === 'moveset' && i.user.id === interaction.user.id;
        const collector = embedEnviado.createMessageComponentCollector({ filter });
    

        const ir_pokedex = new ButtonBuilder()
            .setCustomId('pokedex')
            .setLabel('Voltar para Página Principal')
            .setStyle(ButtonStyle.Danger)

        const pokedex_moveset = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`Moveset do ${poke_name}`)
            .setDescription(`${poke_Moves}`)

        const botoes2 = new ActionRowBuilder()
            .addComponents(ir_pokedex)

        collector.on('collect', async () => {
            await embedEnviado.delete()
            await interaction.channel.send({ embeds: [pokedex_moveset], components: [botoes2] });
            collector.stop();
        })
        
        return poke_Moves        
    }   

    module.exports = { handleMoveset };
