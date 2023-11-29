module.exports = (req, res, next) => {
  console.log("token from other side", req.cookies.token);
};
