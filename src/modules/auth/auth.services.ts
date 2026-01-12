import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/db";
import type { TSignupPayload } from "./auth.schema";

const SignupService = async (payload: TSignupPayload) => {
  const { name, email, password, phone, role } = payload;

  // Check if user with the email already exists
  const existing = await pool.query(`SELECT id FROM users WHERE email = $1`, [
    email.toLowerCase(),
  ]);
  if (existing.rows.length > 0) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user and return created user (exclude password)
  const insert = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, password, phone, role`,
    [name, email.toLowerCase(), hashedPassword, phone, role]
  );

  return insert.rows[0];
};

const LoginService = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  //check if user exist or not:
  if (result.rows.length === 0) return null;
  const user = result.rows[0];

  //compare the password
  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) return false;

  // make access_token
  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};

export const authServices = {
  SignupService,
  LoginService,
};
