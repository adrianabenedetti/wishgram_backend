import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({
      errorType: "Token not found",
      statusCode: 401,
      message: "Access token required",
    });

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(403).send({
      errorType: "Token not valid",
      statusCode: 403,
      message: "Token not valid",
    });
  }
};
export default authToken;