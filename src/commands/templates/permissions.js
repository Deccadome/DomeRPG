const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permissions')
        .setDescription('This command requires permission')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const role = await interaction.guild.roles
            .fetch('ID')
            .catch(console.error);

        const testRole = await interaction.guild.roles.create({
            name: `Test`,
            permissions: [PermissionsBitField.Flags.KickMembers]
        }).catch(console.error);

        if (roles.cache.has('ID')) {
            await interaction.deferReply({
                fetchReply: true
            });
            await roles.remove(role).catch(console.error);
            await interaction.editReply({
                content: `Removed: ${role.name} from you.`
            });
        } else {
            await interaction.editReply({
                content: `You do not have the ${role.name} role.`
            });
        }

        await role.add(testRole).catch(console.error);

        await testRole
            .setPermissions([PermissionsBitField.Flags.BanMembers])
            .catch(console.error);

        const channel = await interaction.guild.channels.create({
            name: `test`,
            permissionOverwrites: [{
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: testRole.id,
                allow: [PermissionsBitField.Flags.ViewChannel]
            }]
        });
        await channel.permissionOverwrites
            .edit(testRole.id, { SendMessages: false })
            .catch(console.error);
    }
}