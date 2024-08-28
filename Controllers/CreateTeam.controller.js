import Team from "../Models/Team.model.js";

export const createTeam = async (req, res) => {
    try {
        const { team_name } = req.body;
        console.log(team_name);
        if(!team_name) {
          return res.status(401).json({message:'name required'})
        }
        // Check if the team name already exists
        const existingTeam = await Team.findOne({ team_name });

        console.log(existingTeam, "check")
        if (existingTeam) {
            return res.status(400).json({ message: 'Team name already exists' });
        }

        // Create a new team
        const newTeam = await Team.create({
            team_name: team_name,
            users: []
        });
        console.log("check 2")
        return res.status(201).json({ message: 'Team created successfully', team: newTeam });

    } catch (error) {
        return res.status(500).json({ message: 'Error creating team', error: error.message });
    }
};

