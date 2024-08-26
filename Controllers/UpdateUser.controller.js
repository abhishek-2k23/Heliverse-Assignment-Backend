import User from "../Models/User.model.js";

export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findOneAndUpdate({ id: id }, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: "Error updating user", error: error.message });
    }
  };