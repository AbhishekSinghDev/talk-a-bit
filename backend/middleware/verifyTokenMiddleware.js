import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Unauthorized access, Invalid token",
      });
    }
  }

  if (!req.headers.authorization) {
    res.status(400).json({
      success: false,
      message: "Unauthorized access, No token provided",
    });
  }
};

export default protect;
