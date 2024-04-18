	const { SlashCommandBuilder } = require('discord.js');
	const fetch = require('node-fetch'); 
	const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
	const { handleMoveset } = require('./moveset.js');

	module.exports = {
		data: new SlashCommandBuilder()
			.setName('pokedex')
			.setDescription('Retorna dados de um Pokemon')
			.addStringOption(option =>
				option.setName('nome_pokemon')
					.setDescription('Insira o nome do Pokémon') 
					.setRequired(true)),

		async execute(interaction) {

		const pokemon = interaction.options.getString("nome_pokemon")
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		const poke_data = await response.json()
		let poke_name = poke_data.name;
		poke_name = poke_name.charAt(0).toUpperCase() + poke_name.slice(1);
		const poke_image = poke_data.sprites.other["official-artwork"].front_default;

		const descUrl = poke_data.species.url;
		const descResponse = await fetch(descUrl);		
		const descData = await descResponse.json();
		const poke_desc = descData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
			
		let poke_types = poke_data.types.map(type => type.type.name);
		poke_types = poke_types.map(type => type.charAt(0).toUpperCase() + type.slice(1));

		const typeUrl = poke_data.types["0"].type.url
		const typeResponse = await fetch(typeUrl)
		const typeData = await typeResponse.json()
		let double_dmg_names = typeData.damage_relations.double_damage_from.map(double_dmg_from=> double_dmg_from.name)
		double_dmg_names = double_dmg_names.map(double_damage_from => double_damage_from.charAt(0).toUpperCase() + double_damage_from.slice(1))

		const ir_moveset = new ButtonBuilder()
				.setCustomId('moveset')
				.setLabel('Ver Moveset')
				.setStyle(ButtonStyle.Danger);

			const botoes = new ActionRowBuilder()
				.addComponents(ir_moveset);
			
	const pokedex = new EmbedBuilder()
		.setColor('Red')
		.setTitle(`${poke_name}`)
		.setDescription(`${poke_desc}`)
		.setThumbnail('https://64.media.tumblr.com/9b521d7ea0df3175f4821022c504e231/716cd31c60495dbd-05/s250x400/8bcd348f1e026c7df95aee10f935f98249b0da16.pnj')
		.setImage(`${poke_image}`)
		.addFields(
			{ name: 'Type', value: `${poke_types}`, inline: false },
			{ name: "Weakness", value: `${double_dmg_names}`, inline: false},
		)
		
		const embedEnviado = await interaction.reply({ embeds: [pokedex], components: [botoes], fetchReply: true });
		handleMoveset(embedEnviado, poke_name, pokemon, poke_data, interaction);
		}}