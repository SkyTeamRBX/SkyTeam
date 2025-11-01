import type { CommandInteraction } from "discord.js";
import {
	ContainerBuilder,
	MediaGalleryBuilder,
	MediaGalleryItemBuilder,
	MessageFlags,
	TextDisplayBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	SectionBuilder,
	ButtonBuilder,
	ButtonStyle,
} from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class SetupChannelCommand {
	@Slash({
		name: "setupchannel",
		description: "Sets up a channel.",
		dmPermission: false,
		defaultMemberPermissions: ["Administrator"],
	})
	async setupchannel(interaction: CommandInteraction) {
		const channelName = interaction.channel?.name;

		interaction.deferReply({
			flags: [MessageFlags.Ephemeral],
		});

		switch (channelName) {
			case "portal":
				await interaction.channel?.send({
					content:
						"https://files.skyteam.dev/api/public/dl/dir8x9Bc/Assets/Portal.png",
				});

				await interaction.channel?.send({
					flags: [MessageFlags.IsComponentsV2],
					components: [
						new ContainerBuilder().addTextDisplayComponents(
							new TextDisplayBuilder({
								content:
									"> SkyTeam ROBLOX is an alliance of exceptional virtual airlines looking to provide the best connected experience within our platform. We are the **most advanced alliance** on ROBLOX, with a focus on innovation, pride and community. With our 'Caring more about you' commitment, we are dedicated to providing the best experience for our passengers at our member airlines.",
							}),
						),
						new ContainerBuilder()
							.addMediaGalleryComponents(
								new MediaGalleryBuilder().addItems(
									new MediaGalleryItemBuilder({
										description: "CommunitySafeguarding",
										media: {
											url: "https://files.skyteam.dev/api/public/dl/OuaEU0b4/Assets/CommunitySafeguarding.png",
										},
									}),
								),
							)
							.addTextDisplayComponents(
								new TextDisplayBuilder({
									content:
										"-# SkyTeam Virtual has implemented a series of rules and regulations to maintain peace and security amongst our community. It is our expectation that each individual abides by every rule listed below.",
								}),
								new TextDisplayBuilder({
									content: `
### 1. Mutual Respect\nYou must respect all users within our community, regardless of your personal feeling towards others. We expect you to have tolerance and understanding towards anyone; treat others how you would want to be treated.
### 2. No Spamming\nPlease do not send repeated or excessive messages in any channel. This includes sending the same message multiple times, sending messages with no meaning or purpose, and sending messages which are not relevant to the channel or topic.
### 3. SFW Content\nWe ask that you do not send any NSFW content as this community is largely minors. Any content including nudity, gore, sexual content is strictly prohibited.
### 4. No advertising\nPlease refrain from unsolicited advertising or posting links to other groups.
### 5. No Malicious Content\nThis server strictly prohibits content which is malicious. This includes links, viruses, crash videos and any other content which may cause harm to another user.
### 6. Politics\nWe ask that you do not discuss any insensitive political topics within our community. This includes promoting any political parties, ideologies or beliefs.
### 7. Voice Chat\nWe ask that you be respectful and courteous to all users within our voice channels. This includes not playing music, being disruptive or causing any other issues.

<:chevrongrey:1265399459886534730>_ _ *The [Discord Terms of Service](https://discord.com/terms) is also regulated and enforced in this server.*
									`,
								}),
							)
							.addSeparatorComponents(
								new SeparatorBuilder({
									spacing: SeparatorSpacingSize.Large,
								}),
							)
							.addMediaGalleryComponents(
								new MediaGalleryBuilder().addItems(
									new MediaGalleryItemBuilder({
										description: "Links",
										media: {
											url: "https://files.skyteam.dev/api/public/dl/X9jntg4K/Assets/Links.png",
										},
									}),
								),
							)
							.addSectionComponents(
								new SectionBuilder()
									.addTextDisplayComponents(
										new TextDisplayBuilder({
											content:
												"<:discord:1231369743257043006>_ _ **Discord**",
										}),
									)
									.setButtonAccessory(
										new ButtonBuilder()
											.setLabel("Join (.gg/skyteam)")
											.setURL(
												"https://discord.gg/skyteam",
											)
											.setStyle(ButtonStyle.Link),
									),
								new SectionBuilder()
									.addTextDisplayComponents(
										new TextDisplayBuilder({
											content:
												"<:twitter:1231369822676324504>_ _ **Twitter**",
										}),
									)
									.setButtonAccessory(
										new ButtonBuilder()
											.setLabel("Follow (@SkyTeam_RBX)")
											.setURL(
												"https://twitter.com/SkyTeam_RBX",
											)
											.setStyle(ButtonStyle.Link),
									),
								new SectionBuilder()
									.addTextDisplayComponents(
										new TextDisplayBuilder({
											content:
												"<:roblox:1231369819908083792>_ _ **ROBLOX**",
										}),
									)
									.setButtonAccessory(
										new ButtonBuilder()
											.setLabel("Open (SkyTeam Virtual)")
											.setURL(
												"https://www.roblox.com/groups/33548693/SkyTeam-Virtual",
											)
											.setStyle(ButtonStyle.Link),
									),
								new SectionBuilder()
									.addTextDisplayComponents(
										new TextDisplayBuilder({
											content:
												"<:affiliates:1231369739360800849>_ _ **Fact Sheet**",
										}),
									)
									.setButtonAccessory(
										new ButtonBuilder()
											.setLabel("View")
											.setURL(
												"https://office.skyteamrbx.com/share/slSYvGAnypOqdYR8ssyWyIMt4J5R37jOvcT6ShV8PE7eYPUtuI",
											)
											.setStyle(ButtonStyle.Link),
									),
							)
							.addTextDisplayComponents(
								new TextDisplayBuilder({
									content:
										"_ _\nFrom the SkyTeam board, we want to thank you for joining and supporting our group of airlines. We take immense pride in our services, and your presence adds tremendous value to our journey.\n\n**Thank you.**\n\n-# We want to make it clear that we **do not represent** ourselves as the real life SkyTeam alliance, rather a roblox recreation/parody.",
								}),
							)
							.addSeparatorComponents(
								new SeparatorBuilder({
									spacing: SeparatorSpacingSize.Large,
								}),
							)
							.addTextDisplayComponents(
								new TextDisplayBuilder({
									content: "-# Caring more about you",
								}),
							),
					],
				});
				break;
			case "affiliates":
				await interaction.channel?.send({
					content:
						"https://files.skyteam.dev/api/public/dl/5GAYQdYA/Assets/Affiliates.png",
				});
		}

		interaction.editReply({
			flags: [MessageFlags.IsComponentsV2],
			components: [
				new ContainerBuilder().addTextDisplayComponents(
					new TextDisplayBuilder({
						content: "Channel setup complete.",
					}),
				),
			],
		});
	}
}
