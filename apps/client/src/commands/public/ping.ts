import type { CommandInteraction } from 'discord.js';
import { ContainerBuilder, MessageFlags, TextDisplayBuilder } from 'discord.js';
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
			flags: [
				MessageFlags.IsComponentsV2,
				MessageFlags.Ephemeral
			],
			components: [
				new ContainerBuilder()
					.addTextDisplayComponents(
						new TextDisplayBuilder({
							content: `Ping: ${interaction.client.ws.ping}ms`,
						})
					)
			]
		});
	}
}