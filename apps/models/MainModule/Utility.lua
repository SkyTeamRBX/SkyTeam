local Utility = {}

local Environment = require(script.Parent.Environments[workspace:GetAttribute("SkyTeamEnvironment")])

function Utility:CheckPrivilege(Player: Player): number
    if not Player then return false end
    
    local success, rank = pcall(function()
        return Player:GetRankInGroup(Environment.GROUP_ID)
    end)
    
    if not success then return false end
    
    for rankthres, value in Environment.RANK_THRESHOLDS do
        if rank >= rankthres then
            return value
        end
    end
    
    return 0
end

return Utility