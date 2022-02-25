const rate = require("discord.js-rate-limiter")
let rateLimiter = new rate.RateLimiter(1, 2000); 

const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("banner")
        .setDescription("change the server banner")
        .addStringOption((option) => option.setName("url").setDescription("url to the image/gif you want to set as banner")),
    async execute(interaction) {
        const guild = interaction.guild
        const banner = interaction.options.getString("url")
        let limited = rateLimiter.take(interaction.user.id); 
        if (limited) {
            await interaction.reply({content: `there is a cooldown of 10 minutes, pls try again later`})
            return
        } else
        guild.setBanner(`${banner}`).then(updated => console.log(`${interaction.user.tag} set the banner to ${banner}`))
        interaction.reply({ content: `new banner set by ${interaction.user.tag}` });
    },
};