import { generateToken } from "../../utils/jwt.js";
import User from "../user/user.model.js";
import bcrypt from "bcryptjs";
import { Notification } from "../notification/notification.model.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  //checking whether the user exists in the db before registering
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Trigger notification to Admin
  await Notification.create({
    type: "SYSTEM",
    title: "New User Registration",
    message: `${name} has just registered a new account.`,
    link: "/admin/users"
  });

  const token = generateToken(user);

  res.status(201).json({
    message: "User Created Successfully",
    token,
    user,
  });
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (user.isActive === false) {
    return res.status(403).json({ message: "Account deactivated. Contact support." });
  }

  const token = generateToken(user);

  res.json({ message: "user logged in successfully", token, user });
};
