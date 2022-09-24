const Character = require('../../schemas/character');
const Tools = require('../../functions/tools/tools.js')

module.exports = {
    data: {
        name: `deleteCharacterConfirm`,
    },
    async execute(interaction, client) {
        confirmDel = await interaction.values[0];
        console.log(confirmDel);
        if(confirmDel != 'no') {
            option = confirmDel;
            optionSlug = Tools.formatSlug(option);
            try {
                await Character.findOneAndDelete({ userId: interaction.user.id, charSlug: optionSlug });
                await interaction.reply({ content: `Character ${option} successfully deleted.`, ephemeral: true })
            } catch (error) {
                await interaction.reply({ content: `Unable to delete ${confirmDel}.`, ephemeral: true});
                console.error(error);
            }
        } else{
            await interaction.reply({ content: `Operation cancelled.`, ephemeral: true});
        }
    }
}