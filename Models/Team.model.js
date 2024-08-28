import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const teamSchema = new mongoose.Schema({
  team_id: {
      type: String,
      default: uuidv4,
      unique: true
  },
  team_name: {
      type: String,
      required: true, // This makes sure team_name cannot be null
      unique: true
  },
  users: []
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

export default Team;