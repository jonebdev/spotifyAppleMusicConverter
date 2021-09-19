const fs = require("fs");
const jwt = require("jsonwebtoken");

const generateAppleJWT = () => {
  const privateKeyPath = process.env.P8_FILE_NAME;
  const privateKey = fs.readFileSync(privateKeyPath).toString();
  const teamId = process.env.APPLE_TEAM_ID;
  const keyId = process.env.APPLE_KEY_ID;
  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "10d",
    issuer: teamId,
    header: {
      alg: "ES256",
      kid: keyId,
    },
  });
  return token
}

module.exports ={
  generateAppleJWT
}