// import dependencies
const { expressjwt: jwt } = require("express-jwt");

// middleware to handle JWT authentication
// requests from all users to /users/login and /users/register and GET and OPTIONS requests to /api/v1/products and /api/v1/categories are allowed
require("dotenv/config");
const secret = process.env.SECRET;
const api = process.env.API_URL;

function authJwt() {
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  });
}

// checks if a token has been revoked, if the user is not an admin, revoke the token
function isRevoked(req, data) {
  const { payload } = data;
  console.log("payload", payload);
  try {
    if (payload.isAdmin !== true || !payload) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
}

module.exports = authJwt;
