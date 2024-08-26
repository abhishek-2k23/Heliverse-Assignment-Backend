import User from "../Models/User.model.js";

// Get user with pagination functionality
export const getUsers = async (req, res) => {
  try {
    // Get page and limit from query parameters, with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch users with pagination
    const users = await User.find()
      .skip(skip)
      .limit(limit);

    // Get total number of documents
    const totalUsers = await User.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalUsers,
      users,
    });
  } catch (error) {
    res.status(400).json({ message: "Error fetching users", error: error.message });
  }
};
