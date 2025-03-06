--[[

    SkyTeam Miles
    @h1ddenscript 04/03/2025

]]
--

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Cmdr = require(script.Packages.cmdr)
local Utility = require(script.Utility)

local Remote = Instance.new("RemoteEvent")
local Bridge = Instance.new("RemoteFunction")

local MainModule = {}

export type Settings = {
	API_URL: string,
	API_KEY: string,
}

function MainModule.init(Settings: Settings)
	script.Name = ".skyteamruntime"
	script.Parent = ReplicatedStorage

    MainModule:SetupNetwork()

	if not Settings.API_URL then
		error("API_URL is required")
	end

	-- Cmdr:RegisterDefaultCommands()
	Cmdr:RegisterHooksIn(script.Hooks)
	Cmdr:RegisterCommandsIn(script.Commands)

	for _, Player in Players:GetPlayers() do
		MainModule:SetupClient(Player)
	end

	Players.PlayerAdded:Connect(function(Player)
		MainModule:SetupClient(Player)
	end)
end

function MainModule:SetupClient(Player: Player)
	if not Player then
		return
	end

	local GUI = Instance.new("ScreenGui")
	GUI.Name = "SkyTeamClient"
	GUI.Parent = Player:WaitForChild("PlayerGui")

	local ClientScript = script.Client:Clone()
	ClientScript.Parent = GUI
end

function MainModule:SetupNetwork()
    local NetworkFolder = Instance.new("Folder")
    NetworkFolder.Name = ".skyteam_network"
    NetworkFolder.Parent = ReplicatedStorage
    
    Remote.Name = "clientremote"
    Remote.Parent = NetworkFolder

    Bridge.Name = "clientbridge"
    Bridge.Parent = NetworkFolder
end

return MainModule
