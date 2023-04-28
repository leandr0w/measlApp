const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.validExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `user not with id: ${id} not found`,
    });
  }
  req.user = user;
  next();
});
