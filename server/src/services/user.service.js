import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import appConf from "../../dotenv.js";

export const signup = async ({ username, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    return;
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await User.create({ username, email, passwordHash });
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    appConf.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return { token };
};

