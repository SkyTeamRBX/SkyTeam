import type { CommandInteraction } from 'discord.js';
import { ContainerBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder, MessageFlags, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, AttachmentBuilder, Attachment } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
export class SetupChannelCommand {
	@Slash({
		name: 'info',
		description: 'Sets up a channel.',
		dmPermission: false,
		defaultMemberPermissions: ['Administrator']
	})
	async setupchannel(interaction: CommandInteraction) {
		const channelName = interaction.channel?.name;

		interaction.deferReply({
			flags: [
				MessageFlags.Ephemeral
			]
		})

		switch (channelName) {
			case 'portal':
				await interaction.channel?.send({
					flags: [
						MessageFlags.IsComponentsV2
					],
					components: [
						new ContainerBuilder()
							.addMediaGalleryComponents(
								new MediaGalleryBuilder()
									.addItems(
										new MediaGalleryItemBuilder({
											description: 'PortalBanner',
											media: {
												url: 'https://files.skyteam.dev/api/public/dl/Wgo-h6Sb/Assets/Portal.png'
											}
										})
									)
							),
						new ContainerBuilder()
							.addTextDisplayComponents(
								new TextDisplayBuilder({
									content: '> SkyTeam ROBLOX is an alliance of exceptional virtual airlines looking to provide the best connected experience within our platform. We are the **most advanced alliance** on ROBLOX, with a focus on innovation, pride and community. With our \'Caring more about you\' commitment, we are dedicated to providing the best experience for our passengers at our member airlines.'
								})
							)
							.addSeparatorComponents(
								new SeparatorBuilder({
									spacing: SeparatorSpacingSize.Large
								})
							)
							.addMediaGalleryComponents(
								new MediaGalleryBuilder()
									.addItems(
										new MediaGalleryItemBuilder({
											description: 'CommunitySafeguarding',
											media: {
												url: 'https://files.skyteam.dev/api/public/dl/OuaEU0b4/Assets/CommunitySafeguarding.png'
											}
										})
									)
							)
							.addTextDisplayComponents(
								new TextDisplayBuilder({
									content: '-# SkyTeam Virtual has implemented a series of rules and regulations to maintain peace and security amongst our community. It is our expectation that each individual abides by every rule listed below.\n\n1. Mutual respect, tolerance and safety'
								})
							)
					]
				})
		}
	}
}