module.exports = {
    data: {
        name: `exampleButton`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://deccadome.com`
        });
    }
}