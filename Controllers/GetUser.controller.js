import User from "../Models/User.model.js"

// Get user with pagination functionality
export const getUsers = async (req, res) => {
  try {
    // Get page and limit from query parameters, with default values
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20

    //if there is any domain provided
    const domain = req.query.domain
    if (domain) {
      console.log("in the domain")
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit
      try {
        const users = await User.find({ domain }).skip(skip).limit(limit)

        if (!users.length) {
          return res.status(404).json({ message: "no data matched" })
        }

        //total users with that domain
        const totalUsers = await User.countDocuments({ domain })

        //total page
        const totalPages = Math.ceil(totalUsers / limit)

        return res.status(200).json({
          message: `users with domain ${domain} fetched`,
          totalPages: totalPages,
          totalUsers: totalUsers,
          currentPage: page,
          users: users,
        })
      } catch (e) {
        console.log("Error in fetching domain specific user", e)
      }
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit

    // Fetch users with pagination
    const users = await User.find().skip(skip).limit(limit)

    // Get total number of documents
    const totalUsers = await User.countDocuments()

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit)

    //all available domains 
    const domain_list = await User.distinct('domain');

    res.status(200).json({
      currentPage: page,
      limit,
      totalPages,
      totalUsers,
      domain_list,
      users,
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching users", error: error.message })
  }
}

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
      first_name: {$regex: `^${searchTerm}`, $options: 'i'}
    })
    const totalPages = Math.ceil(totalUsers / limit)

    console.log(users, totalUsers);
    // Check if users are found
    if (Array.isArray(users) && users.length > 0) {
      return res
        .status(200)
        .json({
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
