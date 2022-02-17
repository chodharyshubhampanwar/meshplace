import Users from "../models/Users.js";
import {StatusCodes} from 'http-status-codes'

const register = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
    
  } catch (err) {
   
  }
};
const login = async (req, res) => {
  res.send("login");
};
const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { register, login, updateUser };
