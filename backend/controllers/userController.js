import User from "../models/userModel.js";

// this function search particular user and gets all the users in db also
const searchUser = async (req, res) => {
  // searching user in db without his full name if not given
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // this extra find method here to exclude current user from seaching users result.
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

export { searchUser };
