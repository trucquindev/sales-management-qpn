const {
  registerUser,
  loginUser,
  updateUser,
} = require('../services/user.service');

async function signUp(req, res) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const userId = req.params.userId;
    const user = await updateUser(userId, req.body);
    res.status(200).json({ message: 'Updated successfully.', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signUp, signIn, update };
