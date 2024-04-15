const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch'); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokedex')
		.setDescription('Retorna dados de um Pokemon')
		.addStringOption(option =>
            option.setName('nome_pokemon')
                .setDescription('Insira o nome do Pokémon') // Isso precisa ser uma string literal.
                .setRequired(true)),

	async execute(interaction) {
	const pokemon = interaction.options.getString("nome_pokemon")
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const poke_data = await response.json()
    const poke_name = poke_data.id
    await interaction.reply(`O nome do pokemon é ${poke_name}`)
    console.log (poke_data.name)

	},
};