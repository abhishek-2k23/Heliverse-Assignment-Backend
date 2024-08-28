import Team from "../Models/Team.model.js";

export const getTeam = async(req, res) => {
    try{
        const teams = await Team.find();
        if(teams.length === 0){
            return res.status(200).json({message: 'No Team Available'})
        }
        return res.status(200).json({message: "Teams fetched ", teams})
    }catch(e){
        return res.status(500).json({message : e.message})
    }
}