module.exports = {
    isValid,
    gotEmail
  };
  
  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }
  
  function gotEmail (user) {
      return Boolean(user.email)
  }