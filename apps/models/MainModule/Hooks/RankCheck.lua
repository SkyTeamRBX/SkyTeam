local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
 
local Utility = require(ReplicatedStorage:WaitForChild(".skyteamruntime"):WaitForChild("Utility"))

local NoPermissionCallback = "You don't have permission to run this command"

return function (registry)
	registry:RegisterHook("BeforeRun", function(context)
		local ExecutorPlayer: Player = context.Executor
		local RequiredGroupRank = context.Group
		
		local hasPermission = 
			(RequiredGroupRank == "Developer" and Utility:CheckPrivilege(ExecutorPlayer) >= 100) or
			(RequiredGroupRank == "Staff" and Utility:CheckPrivilege(ExecutorPlayer) >= 50) or
			(RequiredGroupRank == "Representative" and Utility:CheckPrivilege(ExecutorPlayer) >= 25)
		
		if RunService:IsStudio() then
			hasPermission = true
		end
				
		if not hasPermission then
			return NoPermissionCallback
		end
	end)
end