import Users from "../models/Users.js";

const register = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.status(200).json({ user });
    console.log(user);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res) => {
  res.send("login");
};
const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
