const TeamSchema = new mongoose.Schema({
    _id: { 
      type: mongoose.Schema.Types.ObjectId, 
      auto: true // Automatically generate a unique ID
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' // Referencing the User model
    }]
  });

  const Team = mongoose.model("Team", TeamSchema)

  export default Team;