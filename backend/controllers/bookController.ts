import { Request, Response } from "express";
import { pool } from "../db.ts";

import { BookType, createBookType } from "../types/book.ts";

export const createBook = async (req: Request, res: Response) => {
  const { title, description, status, price, amount, category_id } =
    req.body as createBookType;

  const created_at = new Date().toISOString();

  try {
    const result = await pool.query(
      `
      INSERT INTO books
        (title,description,status,price,amount,category_id,created_at) 
      VALUES 
        ($1, $2 ,$3 , $4 ,$5 ,$6 ,$7) 
        `,
      [title, description, status, price, amount, category_id, created_at]
    );
    return res.json({ message: "insert success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  const sql = `
    SELECT * FROM books b
    LEFT JOIN category c on b.category_id = c.id
    ORDER BY c.id , b.title ASC
  `

  try {
    const result = await pool.query(sql);
    return res.json({ data: result.rows as BookType[], message: "success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    return res.json({ data: result.rows[0] as BookType, message: "success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, description, status, price, amount, category_id } =
    req.body as createBookType;

  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      `
      UPDATE books SET
        title = $1,
        description = $2,
        status = $3,
        price = $4,
        amount = $5,
        category_id = $6
      WHERE 
        id = $7
       RETURNING *
        `,
      [title, description, status, price, amount, category_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({ message: "update success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `
      DELETE FROM books WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({ message: "Delete success", deleted: result.rows[0] });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
