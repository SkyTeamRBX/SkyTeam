import type { CommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
export class PingCommand {
	@Slash({
		name: 'ping',
		description: 'Test ping command.',
		dmPermission: false,
	})
	async ping(interaction: CommandInteraction) {
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('Pong!')
					.setDescription(`Ping: ${interaction.client.ws.ping}ms`),
			],
		});
	}
}