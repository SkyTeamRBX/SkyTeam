import { dirname, importx } from '@discordx/importer';
import { NotBot } from '@discordx/utilities';
import type { Message } from 'discord.js';
import { ActivityType, EmbedBuilder, IntentsBitField, Partials } from 'discord.js';
import { Client } from 'discordx';

export const bot = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMessageReactions,
		IntentsBitField.Flags.GuildVoiceStates,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.DirectMessages,
		IntentsBitField.Flags.DirectMessageTyping,
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User],

	botGuilds: [process.env.DISCORD_HOME_GUILD_ID],

	silent: false,
	guards: [NotBot],
	simpleCommand: {
		prefix: 'st!',
	},
});

bot.once('ready', async () => {
	await bot.initApplicationCommands();
	bot.user?.setActivity({ type: ActivityType.Custom, name: '⬇️ DM the bot below for help' });

	console.log('Bot initalized.');
});

bot.on('interactionCreate', (interaction) => {
	try {
		bot.executeInteraction(interaction);
	} catch (error) {
		const errEmbed = new EmbedBuilder()
			.setDescription(
				`<:warning:1204923305895665705>_ _ An error occured whilst trying to run this command; please try again later.`
			)
			.setTimestamp();

		if (interaction.isRepliable()) {
			interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}

		const log = new EmbedBuilder()
			.setDescription(
				'<:alert:1255679013158916177>_ _ An error occured :( \n**Error:** ```\n' +
					error +
					'\n```'
			)
			.setFields([
				{ name: 'User', value: `<@${interaction.user.id}>`, inline: true },
				{ name: 'Channel', value: `<#${interaction.channel?.id}>`, inline: true },
			]);
	}
});

bot.on('messageCreate', async (message: Message) => {
	await bot.executeCommand(message);
});

await importx(`${dirname(import.meta.url)}/{events,commands,guards}/**/*.{ts,js}`);

if (!process.env.DISCORD_TOKEN) {
	throw Error('Bot token not found.');
}

bot.login(process.env.DISCORD_TOKEN);
