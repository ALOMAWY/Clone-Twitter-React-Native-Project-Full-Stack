import { getAuth } from "@clerk/express";

const protectedRoute = (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }

  req.userId = userId; // optional useful
  next();
};

export default protectedRoute;
