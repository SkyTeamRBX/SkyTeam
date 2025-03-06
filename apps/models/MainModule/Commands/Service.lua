return {
	Name = "service";
	Aliases = {};
	Description = "Update the SkyTeam Service";
	Group = "Developer";
	Args = {
		{
			Type = "boolean";
			Name = "Enabled";
			Description = "Set the service to enabled or disabled";
		}
	};
}