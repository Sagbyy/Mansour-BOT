const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user-info")
        .setDescription("Pour voir les informations d'un membre discord")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("L'utilisateur dont vous voulez voir les informations")
                .setRequired(true)
        )
    ,
    async execute(interaction) {
        const test = interaction.getUser('user');

        const embed = new EmbedBuilder()
            .setColor("0B0234")
            .setTitle(`Information de : ${test.username}`)
            .setDescription("Some description here")
            .setThumbnail(`${interaction.user.displayAvatarURL()}`)
            .addFields(
                { name: "Regular field title", value: "Some value here" },
                { name: "\u200B", value: "\u200B" },
                {
                    name: "Inline field title",
                    value: "Some value here",
                    inline: true,
                },
                {
                    name: "Inline field title",
                    value: "Some value here",
                    inline: true,
                }
            )
            .addFields({
                name: "Inline field title",
                value: "Some value here",
                inline: true,
            })
            .setImage("https://i.imgur.com/AfFp7pu.png")
            .setTimestamp()
            .setFooter({
                text: "Some footer text here",
                iconURL: "https://i.imgur.com/AfFp7pu.png",
            });

        await interaction.reply({ embeds: [embed] });
    },
};
