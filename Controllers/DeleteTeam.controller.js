import Team from "../Models/Team.model.js";

export const deleteTeam = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTeam = await Team.findOneAndDelete({ team_id: id });
      if (!deletedTeam) {
        return res.status(404).json({ message: "Team not found" });
      }
      console.log("Team deleted. id: ", id);
      res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting Team", error: error.message });
    }
  };