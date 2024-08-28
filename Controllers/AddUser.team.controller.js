import Team from "../Models/Team.model.js";
import User from "../Models/User.model.js";

// Add users to a team
export const addUsersToTeam = async (req, res) => {
  try {
    const { teamId } = req.params; // Extract teamId from the request parameters
    const { id } = req.body; // Extract user ID from the request body

    console.log(teamId);

    // Check if the team exists
    const team = await Team.findOne({ team_id: teamId.toString() });
    if (!team) {
      console.log("Team not found")
      return res.status(404).json({toast:'error', message: "Team not found" });
      
    }

    // Check if the user exists
    const user = await User.findOne({id: id});
    if (!user) {
      console.log("user not found")

      return res.json({toast:'error', message: "User not found" });
    }

    // Extract existing domains from the team's current users
    const existingDomains = new Set(team.users.map((user) => user.domain));

    const { domain, available } = user;
    // Check if the user is available
    if (!available) {
      console.log("available not ")

      return res.json({toast:'error', message: `Sorry, You are not available to work` });
    }

    // Check if the domain is already in the set
    if (existingDomains.has(domain)) {
      console.log("Domain matched already")

      return res
        .json({status: false,toast:'error', message: `User with Domain ${domain} is already in the team` });
    }

    // Add the user to the team's users array
    team?.users.push(user);

    // Save the updated team
    const updatedTeam = await team.save();

    console.log("Added to team")
    return res
      .status(200)
      .json({toast:'success', message: `You are added to the ${updatedTeam?.team_name}`, team: updatedTeam });
  } catch (error) {
    console.error("Error adding users to the team:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
