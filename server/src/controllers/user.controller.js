const {
  registerUser,
  loginUser,
  updateUser,
} = require('../services/user.service');
const xml2js = require('xml2js');

const xmlToJson = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
async function signUp(req, res) {
  try {
    const jsonData = await xmlToJson(req.body);
    const initData = {
      name: jsonData.item.name[0],
      password: jsonData.item.password[0],
      email: jsonData.item.email[0],
    };
    const user = await registerUser(initData);

    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function signIn(req, res) {
  try {
    const jsonData = await xmlToJson(req.body);
    const initData = {
      password: jsonData.item.password[0],
      email: jsonData.item.email[0],
    };
    const { email, password } = initData;
    const user = await loginUser(email, password);
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
