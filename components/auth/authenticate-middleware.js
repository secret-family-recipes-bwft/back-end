//checks if the user is logged in

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const secret = process.env.JWT_SECRET

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: 'invalid token'})
      }  else {
        req.jwt = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({ you: 'must be logged in to access' });
  }

};