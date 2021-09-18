const expressJwt = require("express-jwt");

export const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});
