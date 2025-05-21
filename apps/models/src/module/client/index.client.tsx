/**
 * @author h1ddenscript
 * @description This is the clientside script of the SkyTeam module.
 */

import Roact from "@rbxts/roact";
import { Players, ReplicatedStorage } from "@rbxts/services";
import ErrorMessage from "./ErrorMessage";
import type { EventTypeKeys, EventTypes } from "../shared/CommunicationTypes";

const ClientCommunication = ReplicatedStorage.WaitForChild(".SKYTEAM_CLIENT_RUNTIME") as RemoteEvent
const Player = Players.LocalPlayer

wait(.5)

/**
 * this is a really hacky way to mount it w/o serverside replication
 * im just scared of weird scripts ppl might use that could break it if we js left it in playergui
 */
if (script.Parent?.IsA("PlayerGui")) {
    script.Clone().Parent = Player.WaitForChild("PlayerScripts")
} else {    script.Parent = undefined

    ClientCommunication.OnClientEvent.Connect((eventType: EventTypeKeys, rawargs: unknown) => {
        switch (eventType) {
            case "SERVER_INIT_ERROR": {
                const args = rawargs as EventTypes["SERVER_INIT_ERROR"];

                Roact.mount(
                    <ErrorMessage
                        BackgroundColor={Color3.fromRGB(255, 149, 0)}
                        ElementColor={Color3.fromRGB(71, 41, 0)}
                        Title="Service Initialization Error"
                        Body={args.Body}
                    />,
                    Player.WaitForChild("PlayerGui")
                );
                break;
            }
        }
    })
}