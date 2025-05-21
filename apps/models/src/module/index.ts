/**
 * @class SkyTeamModule
 * @author h1ddenscript
 * @description This module is used to setup the SkyTeam system within a SkyTeam Alliance Members' game.
 */

import { HttpService, Players, ReplicatedStorage } from "@rbxts/services";
import { EventTypeKeys, EventTypes } from "./shared/CommunicationTypes";

export interface Settings {
	/**
	 * @interface Settings
	 * @description This interface is used to define the settings for the SkyTeam module.
	 * 
	 * @property {string} TOKEN - The token for the module.
	 * @property {string[]} Flags - The flags for the module.
	 */

	TOKEN: string;
	Flags: string[];
}

/**
 * @class SkyTeamModule
 * @description This constructor is used to setup the SkyTeam module.
 * @constructor
 * @param {Settings} Settings - The settings for the module.
 */
export default class {
	private Settings: Settings;
	public API: string = "http://localhost:4000"
	public RemoteEvent: RemoteEvent = new Instance("RemoteEvent");
	public Slocked: boolean = false;
	public InitalizationError: string | undefined;

	constructor(Settings: Settings) {
		script.Parent = ReplicatedStorage
		this.Settings = Settings;
	}

	/**
	 * @method Initialize
	 * @description Hot method is used to initialize the module.
	 * @returns {void}
	 */
	public Initialize(): void {
		this.RemoteEvent.Name = ".SKYTEAM_CLIENT_RUNTIME"
		this.RemoteEvent.Parent = ReplicatedStorage;

		for (const Player of Players.GetPlayers()) {
			const ClientScript = script.WaitForChild("client").Clone()
			ClientScript.Parent = Player.WaitForChild("PlayerGui")
		}

		Players.PlayerAdded.Connect((Player) => {
			const ClientScript = script.WaitForChild("client").Clone()
			ClientScript.Parent = Player.WaitForChild("PlayerGui")

			if (this.InitalizationError) {
				this.PublicError("SERVER_INIT_ERROR", {
					Body: this.InitalizationError
				})
			}
		})

		this.TestServices().catch((err) => {
			warn(err)
			this.InitalizationError = err;
			this.PublicError("SERVER_INIT_ERROR", {
				Body: `SkyTeam module failed to initialize. Please contact a developer. Error: ${err}`,
			})
		})
	}

	private async TestServices(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			const [success, result] = pcall(() => {
				HttpService.GetAsync("https://example.com/")
			})

			if (!success) {
				reject(result);
				return;
			}

			resolve(result);
		});
	}

	private async PublicError<T extends EventTypeKeys>(WhichEvent: T, args: EventTypes[T]) {
		this.RemoteEvent.FireAllClients(WhichEvent, args);
	}
}