import { pool } from "../db.js";
import { Request, Response } from "express";
import * as Types from "../types/category.ts";

export const createCategory = async (req: Request, res: Response) => {
  const sql = `INSERT INTO category (category_name) VALUES ($1) RETURNING *`;
  const { category_name } = req.body as Types.CreateCategoryType;

  try {
    const response = await pool.query(sql, [category_name]);
    return res
      .status(200)
      .json({ message: "insert success!!", data: response.rows[0] });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const sql = `SELECT * FROM category`;

  try {
    const response = await pool.query(sql);

    if (response.rowCount == 0) {
      return res.status(200).json("no record data");
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const sql = `UPDATE category SET category_name = $1 WHERE id = $2 RETURNING *`;

  const { category_name } = req.body as Types.UpdateCategoryType;
  const id = req.params.id;

  try {
    const response = await pool.query(sql, [category_name, id]);

    if (response.rowCount == 0) {
      return res.status(200).json(`category id : ${id} is not found`);
    }

    return res
      .status(200)
      .json({ message: " update success!!", data: response.rows[0] });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const sql = `DELETE FROM category WHERE id = $1 RETURNING *`;

  const id = req.params.id;

  try {
    const response = await pool.query(sql, [id]);

    if (response.rowCount == 0) {
      return res.status(200).json(`category id : ${id} is not found`);
    }

    return res
      .status(200)
      .json({
        message: `Delete  category id : ${id} success!!`,
        data: response.rows[0],
      });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
