import User from "../Models/User.model.js"

// Get user with pagination functionality
export const getUsers = async (req, res) => {
  try {
    // Get page and limit from query parameters, with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Initialize the filter object
    let filter = {};

    // Handle domain filter
    const domain = req.query.domain;
    if (domain && domain !== "All") {
      filter.domain = domain;
    }

    // Handle availability filter
    const availability = req.query.availability;
    if (availability && availability !== "All") {
      filter.available = availability === "Available";
    }

    // Handle gender filter
    const gender = req.query.gender;
    if (gender && gender !== "All") {
      filter.gender = gender;
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch users based on the filter with pagination
    const users = await User.find(filter).skip(skip).limit(limit);

    // If no users are found, return a 404 response
    if (!users.length) {
      return res.status(404).json({ message: "No data matched" });
    }

    // Get the total number of users that match the filter
    const totalUsers = await User.countDocuments(filter);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Get all distinct domains (this might be useful for your frontend)
    const domain_list = await User.distinct('domain');

    // Return the response with user data and pagination information
    res.status(200).json({
      message: "Users fetched successfully",
      currentPage: page,
      limit,
      totalPages,
      totalUsers,
      domain_list,
      users,
    });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(400).json({ message: "Error fetching users", error: error.message });
  }
};



export const searchUser = async (req, res) => {
  try {
    const { searchTerm } = req.query // Get the searchTerm from the query params

    const page = req.query.page || 1
    const limit = req.query.limit || 20

    // Check if the searchTerm is provided
    if (!searchTerm) {
      return res.status(400).json({ message: "searchTerm is required" })
    }

    const skip = (page - 1) * limit

    // Use a regular expression to search for the searchTerm in the name field (case-insensitive)
    const users = await User.find({
      first_name: { $regex: `^${searchTerm}`, $options: "i" },
    })
      .skip(skip)
      .limit(limit)

    //search user with the first and from start of the string only.
    const totalUsers = await User.countDocuments({
      first_name: { $regex: `^${searchTerm}`, $options: "i" },
    })
    const totalPages = Math.ceil(totalUsers / limit)

    console.log(users, totalUsers)
    // Check if users are found
    if (Array.isArray(users) && users.length > 0) {
      return res.status(200).json({
        message: `users with ${searchTerm} found`,
        totalPages: totalPages,
        totalUsers: totalUsers,
        currentPage: page,
        users: users,
      })
    } else {
      return res.status(404).json({ message: "No users found " })
    }
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}
