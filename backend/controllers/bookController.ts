import { Request, Response } from "express";
import { pool } from "../db.ts";

import { BookType, createBookType } from "../types/book.ts";

export const createBook = async (req: Request, res: Response) => {
  const { title, description, status, price, amount, category_id, image_url } =
    req.body as createBookType;

  const created_at = new Date().toISOString();

  try {
    const result = await pool.query(
      `
      INSERT INTO books
        (title,description,status,price,amount,category_id,created_at,image_url) 
      VALUES 
        ($1, $2 ,$3 , $4 ,$5 ,$6 ,$7 ,$8) 
        `,
      [
        title,
        description,
        status,
        price,
        amount,
        category_id,
        created_at,
        image_url,
      ]
    );
    return res.json({ message: "insert success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  const sql = `
  SELECT b.id AS book_id,
  b.title,
  b.description,
  b.status,
  b.price,
  b.amount,
  b.image_url,
  b.created_at,
  b.category_id,
  c.id AS category_id,
  c.category_name FROM books b
  LEFT JOIN category c ON b.category_id = c.id
  ORDER BY b.created_at DESC
  LIMIT 3
  `;

  try {
    const result = await pool.query(sql);
    return res.json({ data: result.rows as BookType[], message: "success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getBooksByCategory = async (req: Request, res: Response) => {
  const sql = `
  SELECT 
    c.category_name AS category,
    json_agg(
      json_build_object(
        'id', b.id,
        'title', b.title,
        'description', b.description,
        'status', b.status,
        'price', b.price,
        'amount', b.amount,
        'created_at', b.created_at,
        'image_url', b.image_url
      )
      ORDER BY b.title
    ) AS items
  FROM category c
  LEFT JOIN books b ON b.category_id = c.id
  GROUP BY c.category_name
  ORDER BY c.category_name
  `;

  try {
    const result = await pool.query(sql);
    return res.json({ data: result.rows as BookType[], message: "success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const sql = `
    SELECT * FROM books b
    LEFT JOIN category c ON b.category_id = c.id
    WHERE b.id = $1
  `
  const id = req.params.id;
  try {
    const result = await pool.query(sql, [id]);
    return res.json({ data: result.rows[0] as BookType, message: "success" });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, description, status, price, amount, category_id, image_url } =
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
        image_url = $7
      WHERE 
        id = $7
       RETURNING *
        `,
      [title, description, status, price, amount, category_id, image_url, id]
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
