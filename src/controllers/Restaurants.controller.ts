import { Request, Response } from "express";
import db from "../db";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    res.json({
      results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOneRestaurant = async (req: Request, res: Response) => {
  const { restaurantsid } = req.params;

  try {
    const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      restaurantsid,
    ]);
    res.json({ data: results.rows[0] });
  } catch (err) {
    console.log(err);
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      `INSERT INTO restaurants (name,location,price_range)
       values ($1,$2,$3) RETURNING *`,
      [name, location, price_range]
    );
    res.json({ data: results.rows[0] });
  } catch (err) {
    console.log(err);
  }
};

export const updateOneRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  const { restaurantsid } = req.params;
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1,location = $2, price_range = $3 where id = $4 RETURNING *",
      [name, location, price_range, restaurantsid]
    );
    res.json({ data: results.rows[0] });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOneRestaurant = async (req: Request, res: Response) => {
  const { restaurantsid } = req.params;
  try {
    const results = await db.query("DELETE * FROM restaurants WHERE id = $1", [
      restaurantsid,
    ]);
    res.json({ data: results.rows });
  } catch (err) {
    console.log(err);
  }
};
