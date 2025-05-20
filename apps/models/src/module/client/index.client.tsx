/**
 * @author h1ddenscript
 * @description This is the clientside script of the SkyTeam module.
 */

import Roact from "@rbxts/roact";
import { Players, ReplicatedStorage } from "@rbxts/services";
import ErrorMessage from "./ErrorMessage";
import type CommunicationTypes from "../shared/CommunicationTypes"

const ClientCommunication = ReplicatedStorage.WaitForChild(".SKYTEAM_CLIENT_RUNTIME") as RemoteEvent
const Player = Players.LocalPlayer

wait(.5)

/**
 * this is a really hacky way to mount it w/o serverside replication
 * im just scared of weird scripts ppl might use that could break it if we js left it in playergui
 */
if (script.Parent?.IsA("PlayerGui")) {
    script.Clone().Parent = Player.WaitForChild("PlayerScripts")
} else {
    script.Parent = undefined

    ClientCommunication.OnClientEvent.Connect((EventType: typeof CommunicationTypes[number], ...args: any[]) => {
        switch (EventType) {
            case "SERVER_INIT_ERROR":
                Roact.mount(
                    <ErrorMessage
                        BackgroundColor={Color3.fromRGB(255, 149, 0)}
                        ElementColor={Color3.fromRGB(71, 41, 0)}
                        Title="SkyTeam Authentication Failure"
                        Body="The validity of your API Key cannot be verified. Please enter the correct API key ensuring that there are no spaces at the end or before the quotes.<br/><br/><b>Response 301</b>"
                    />,
                    Player.WaitForChild("PlayerGui")
                )
                break;
        }
    })
}