const { SlashCommandBuilder } = require('discord.js');
const url = "https://animechan.xyz/api/random";
const fetch = require('node-fetch');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Receba uma frase tocante de algum personagem de anime'),
	async execute(interaction) {
			const response = await fetch(url);
			const fraseAnime = await response.json();
			await interaction.reply(`${fraseAnime.quote} \n *${fraseAnime.character} \n  *${fraseAnime.anime} `);
	},
};
