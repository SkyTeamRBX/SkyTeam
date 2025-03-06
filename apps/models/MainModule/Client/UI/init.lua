local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Runtime = ReplicatedStorage:WaitForChild(".skyteamruntime")
local Roact = require(Runtime:WaitForChild("Packages"):WaitForChild("roact")) :: Roact

local Callout = require(script.Components.Callout)

local LocalPlayer = Players.LocalPlayer

local UI = {}

function UI.Init()
    local app = Roact.createElement("ScreenGui", {
        IgnoreGuiInset = true,
        ResetOnSpawn = false
    }, {
        Callout = Roact.createElement(Callout, {
            BackgroundColor = Color3.fromRGB(255, 149, 0),
            Title = "SkyTeam Authentication Failure",
            Body = "The validity of your API Key cannot be verified. Please enter the correct API key ensuring that there are no spaces at the end or before the quotes.<br/><br/><b>Response 301</b>"
        })
    })

    Roact.mount(app, LocalPlayer:WaitForChild("PlayerGui"), "SkyTeamClientService")
end

return UI