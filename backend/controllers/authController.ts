import { pool } from "../db.ts";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import * as Types from "../types/user.ts";
const SECRET = process.env.SECRET_KEY || "secret";

export const register = async (req: Request, res: Response) => {
  const { username, password, firstname, lastname, email, birthdate, role } =
    req.body as Types.CreateUser;
  const sql = `
        INSERT INTO "user" 
            (username , password, firstname, lastname, email, birthdate, role) 
        VALUES
            ($1, $2 , $3 , $4 ,$5 ,$6 ,$7)
        RETURNING *
    `;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const response = await pool.query(sql, [
      username,
      passwordHash,
      firstname,
      lastname,
      email,
      birthdate,
      role,
    ]);

    return res.json({ message: "register success !!", data: response.rows[0] });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body as Types.loginUser;

  const sqlFindUsername = `SELECT * FROM "user" WHERE username = $1`;

  try {
    const responseFindUsername = await pool.query(sqlFindUsername, [username]);

    if (responseFindUsername.rowCount == 0) {
      return res.json(`username : ${username} is not found`);
    }

    const user: Types.getUser = responseFindUsername.rows[0];

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.json("invalid password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login success", token });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
