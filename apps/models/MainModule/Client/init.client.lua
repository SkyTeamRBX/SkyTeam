--[[

    SkyTeam ClientSide

]]--

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local Cmdr = require(ReplicatedStorage:WaitForChild("CmdrClient"))
local UI = require(script.UI)
local Utility = require(ReplicatedStorage:WaitForChild(".skyteamruntime"):WaitForChild("Utility"))

if Utility:CheckPrivilege(Players.LocalPlayer) > 0 then
    Cmdr:SetPlaceName("SkyTeam")
    Cmdr:SetActivationKeys({ Enum.KeyCode.F2 })
end

script.Parent = nil
UI.Init()