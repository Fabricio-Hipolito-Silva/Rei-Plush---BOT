const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dado')
		.setDescription('Devolve um número aleatório entre 1 e o número máximo fornecido')
		.addNumberOption(option =>
			option.setName('numero_max')
				.setDescription('Escolha o número máximo do dado')
				.setRequired(true)  // Garante que o usuário forneça esse número
		),
	async execute(interaction) {
		const numero_max = interaction.options.getNumber('numero_max');
		const resultado = Math.floor(Math.random() * numero_max) + 1;  // Gera um número entre 1 e numero_max
		await interaction.reply(`O seu D${numero_max} deu ${resultado}`);  // Converte o número para string e envia como resposta
	},
};
