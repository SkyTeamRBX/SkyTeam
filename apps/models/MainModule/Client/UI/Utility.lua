local Utility = {}

function Utility.DifferColor(color: Color3, amount: number)
    return Color3.fromRGB(
        math.clamp(color.R + amount, 0, 255),
        math.clamp(color.G + amount, 0, 255),
        math.clamp(color.B + amount, 0, 255)
    )
end

return Utility
