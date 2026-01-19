const preventEmptyReq = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "At least one field is required to update"
    });
  }
  next();
};
module.exports=preventEmptyReq;
