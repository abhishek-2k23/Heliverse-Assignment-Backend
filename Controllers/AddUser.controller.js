import User from "../Models/User.model.js"

// Add a new user
export const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json({ message: "User added successfully", user: newUser })
  } catch (error) {
    res.status(400).json({ message: "Error adding user", error: error.message })
  }
}
