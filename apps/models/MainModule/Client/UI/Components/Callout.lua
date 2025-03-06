local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Runtime = ReplicatedStorage:WaitForChild(".skyteamruntime")
local Roact = require(Runtime:WaitForChild("Packages"):WaitForChild("roact")) :: Roact

local Utility = require(script.Parent.Parent.Utility)

local element = Roact.createElement
local Callout = Roact.Component:extend("Callout")

function Callout:init(props)
	self.BackgroundColor = props.BackgroundColor
	self.Title = props.Title
	self.Body = props.Body
end

function Callout:render()
	return element("ImageButton", {
		AnchorPoint = Vector2.new(0.5, 0),
		AutomaticSize = Enum.AutomaticSize.Y,
		AutoButtonColor = false,
		BackgroundColor3 = self.BackgroundColor,
		BackgroundTransparency = 0.2,
		BorderSizePixel = 0,
		Position = UDim2.fromScale(0.5, 0),
		Size = UDim2.new(1, 10, 0, 0),
	}, {
		ListLayout = element("UIListLayout", {
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
		Padding = element("UIPadding", {
			PaddingBottom = UDim.new(0, 10),
			PaddingLeft = UDim.new(0, 100),
			PaddingRight = UDim.new(0, 100),
			PaddingTop = UDim.new(0, 70),
		}),
		Title = element("TextLabel", {
			BackgroundTransparency = 1,
			Size = UDim2.new(1, 0, 0, 20),
			FontFace = Font.new("rbxassetid://16658221428", Enum.FontWeight.SemiBold),
			Text = self.Title,
			TextColor3 = Utility.DifferColor(self.BackgroundColor, -100),
			TextSize = 16,
			TextXAlignment = Enum.TextXAlignment.Left,
		}, {
			Icon = element("ImageLabel", {
				AnchorPoint = Vector2.new(1, 0.5),
				BackgroundTransparency = 1,
				Position = UDim2.new(0, -8, 0.4, 0),
				Size = UDim2.fromOffset(17, 15),
				Image = "rbxassetid://16660650003",
				ImageColor3 = Utility.DifferColor(self.BackgroundColor, -100),
			}),
		}),
		Body = element("TextLabel", {
			AutomaticSize = Enum.AutomaticSize.Y,
			BackgroundTransparency = 1,
			LayoutOrder = 1,
			Size = UDim2.fromScale(1, 0),
			FontFace = Font.new("rbxassetid://16658221428", Enum.FontWeight.Medium),
			RichText = true,
			Text = self.Body,
			TextColor3 = Utility.DifferColor(self.BackgroundColor, -100),
			TextSize = 14,
			TextXAlignment = Enum.TextXAlignment.Left,
		}, {
			Padding = element("UIPadding", {
				PaddingBottom = UDim.new(0, 5),
			}),
		}),
	})
end

return Callout
