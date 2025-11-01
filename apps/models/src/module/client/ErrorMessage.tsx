import Roact, { createBinding } from "@rbxts/roact";

interface props {
	BackgroundColor: Color3;
	ElementColor: Color3;
	Title: string;
	Body: string;
}

export default class ErrorMessage extends Roact.Component<props> {
	state = {
		isVisible: true,
	};

	render() {
		return (
			<screengui
				IgnoreGuiInset={true}
				ScreenInsets={Enum.ScreenInsets.None}
				Enabled={this.state.isVisible}
				ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			>
				<imagebutton
					AnchorPoint={new Vector2(0.5, 0)}
					AutomaticSize={Enum.AutomaticSize.Y}
					AutoButtonColor={false}
					BackgroundColor3={this.props.BackgroundColor}
					BackgroundTransparency={0.2}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0)}
					Size={new UDim2(1, 10, 0, 0)}
					Event={{
						Activated: () => {
							this.setState({
								isVisible: false,
							});
						},
					}}
				>
					<uilistlayout />
					<uipadding
						PaddingBottom={new UDim(0, 10)}
						PaddingLeft={new UDim(0, 100)}
						PaddingRight={new UDim(0, 100)}
						PaddingTop={new UDim(0, 70)}
					/>
					<textlabel
						BackgroundTransparency={1}
						Size={new UDim2(1, 0, 0, 20)}
						FontFace={
							new Font(
								"rbxasset://fonts/families/BuilderSans.json",
								Enum.FontWeight.SemiBold,
							)
						}
						Text={this.props.Title}
						TextColor3={this.props.ElementColor}
						TextSize={16}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Top}
					>
						<imagelabel
							AnchorPoint={new Vector2(1, 0.5)}
							BackgroundTransparency={1}
							Position={new UDim2(0, -8, 0.4, 0)}
							Size={UDim2.fromOffset(17, 15)}
							Image="rbxassetid://16660650003"
							ImageColor3={this.props.ElementColor}
						/>
					</textlabel>
					<textlabel
						AutomaticSize={Enum.AutomaticSize.Y}
						RichText={true}
						BackgroundTransparency={1}
						LayoutOrder={1}
						Size={new UDim2(1, 0, 0, 0)}
						FontFace={
							new Font(
								"rbxasset://fonts/families/BuilderSans.json",
								Enum.FontWeight.Medium,
							)
						}
						Text={this.props.Body}
						TextColor3={this.props.ElementColor}
						TextSize={14}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Top}
					>
						<uipadding PaddingBottom={new UDim(0, 5)} />
					</textlabel>
				</imagebutton>
			</screengui>
		);
	}
}
