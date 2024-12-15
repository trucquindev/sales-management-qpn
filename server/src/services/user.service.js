const bcrypt = require('bcrypt');
const {
  createUser,
  findUserByUsername,
  findOneById,
  updateUserModel,
} = require('../models/user.models');
const { default: ApiError } = require('~/utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const { pickUser } = require('~/utils/formatter');

async function registerUser(data) {
  const { name, password, email } = data;
  console.log('🚀 ~ registerUser ~ name:', name);

  // Kiểm tra user đã tồn tại
  const existingUser = await findUserByUsername(name);
  console.log('🚀 ~ registerUser ~ existingUser:', existingUser);
  if (existingUser) throw new Error('Username already exists.');

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lưu user mới vào database
  const newUser = {
    name,
    password: hashedPassword,
    email,
    createdAt: new Date(),
  };
  const user = await createUser(newUser);
  return pickUser(user); // Trả về thông tin user
}

async function loginUser(username, password) {
  const user = await findUserByUsername(username);
  if (!user) throw new Error('User not found.');

  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password.');

  return pickUser(user); // Trả về thông tin user
}
async function updateUser(userId, reqBody) {
  const user = await findOneById(userId);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  let updateUser = {
    //
  };
  // truong hop change password
  if (reqBody.current_password && reqBody.new_password) {
    // kiem tra xem current password co dung hay khong
    if (!bcrypt.compareSync(reqBody.current_password, user.password)) {
      throw new ApiError(
        StatusCodes.NOT_ACCEPTABLE,
        'Your current password is incorrect'
      );
    }
    // hash new password
    updateUser = await updateUserModel(user._id, {
      password: bcrypt.hashSync(reqBody.new_password, 8),
    });
  } else {
    // th update cac thong tin chung nhu displayName
    updateUser = await updateUserModel(user._id, reqBody);
  }
  return pickUser(updateUser);
}

module.exports = { registerUser, loginUser, updateUser };
