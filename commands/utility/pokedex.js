// const { SlashCommandBuilder } = require('discord.js');
// const fetch = require('node-fetch'); 

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('pokedex')
// 		.setDescription('Retorna dados de um Pokemon')
// 		.addStringOption(option =>
//             option.setName('nome_pokemon')
//                 .setDescription('Insira o nome do Pokémon') // Isso precisa ser uma string literal.
//                 .setRequired(true)),

// 	async execute(interaction) {
// 	const pokemon = interaction.options.getString("nome_pokemon")
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     if (response.status === 200) {
//         const poke_data = await response.json()
//         return poke_data;
//       }
//     const poke_name = poke_data.id
//     await interaction.reply(`O nome do pokemon é ${poke_name}`)
//     console.log (poke_name)

// 	},
// };

const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokedex')
        .setDescription('Retorna dados de um Pokemon')
        .addStringOption(option =>
            option.setName('nome_pokemon')
                .setDescription('Insira o nome do Pokémon') 
                .setRequired(true)),

    async execute(interaction) {
        const pokemon = interaction.options.getString("nome_pokemon");

        try {
            const response = await fetchWithTimeout(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, 8000); // 8000 milissegundos = 8 segundos
            
            if (response.status === 200) {
                const poke_data = await response.json();
                const poke_name = poke_data.name;
                await interaction.reply(`O nome do pokemon é ${poke_name}`);
                console.log(poke_name);
            } else {
                await interaction.reply(`Ocorreu um erro ao buscar dados do Pokémon. Status: ${response.status}`);
                console.error(`Erro ao buscar dados do Pokémon. Status: ${response.status}`);
            }
        } catch (error) {
            await interaction.reply('Desculpe, houve um erro ao buscar os dados do Pokémon.');
            console.error(`Erro ao buscar dados do Pokémon: ${error.message}`);
        }
    },
};

async function fetchWithTimeout(url, timeout) {
    return new Promise(async (resolve, reject) => {
        const controller = new AbortController();
        const timer = setTimeout(() => {
            controller.abort();
            reject(new Error('Timeout'));
        }, timeout);

        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timer);
            resolve(response);
        } catch (error) {
            clearTimeout(timer);
            reject(error);
        }
    });
}
