const rate = require("discord.js-rate-limiter")

let rateLimiter = new rate.RateLimiter(1, 2000);


const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("icon")

        .setDescription("change the server icon")

        .addStringOption((option) => option.setName("url").setDescription("url to the image/gif you want to set as the icon")),

    async execute(interaction) {

        const icon = interaction.options.getString("url")
        const guild = interaction.guild
        let limited = rateLimiter.take(interaction.user.id);

        if (limited) {

            await interaction.reply({ content: `there is a cooldown of 10 minutes, pls try again later` })

            return

        } else

            guild.setIcon(`${icon}`).then(updated => console.log(`${interaction.user.tag} set the icon to ${icon}`))

        interaction.reply({ content: `new icon set by ${interaction.user.tag}` });

    },

};

