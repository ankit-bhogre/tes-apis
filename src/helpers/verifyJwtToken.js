require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJwtToken(req, res, next) {
  const JwtToken = req.headers['authorization']
  const token = JwtToken && JwtToken.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = verifyJwtToken;