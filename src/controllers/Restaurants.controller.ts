import { Request, Response } from "express";
import db from "../db";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    // const results = await db.query("SELECT * FROM restaurants");
    const results = await db.query(
      `SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as avg_rating
       FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id`
    );
    console.log(results);
    res.json({
      results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOneRestaurant = async (req: Request, res: Response) => {
  const { restaurantid } = req.params;

  try {
    const restaurant = await db.query(
      `SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as avg_rating
      FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1`,
      [restaurantid]
    );
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [restaurantid]
    );
    console.log(reviews);
    res.json({ restaurant: restaurant.rows[0], review: reviews.rows });
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
  const { restaurantid } = req.params;
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1,location = $2, price_range = $3 where id = $4 RETURNING *",
      [name, location, price_range, restaurantid]
    );
    res.json({ data: results.rows[0] });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOneRestaurant = async (req: Request, res: Response) => {
  const { restaurantid } = req.params;
  console.log(restaurantid);
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      restaurantid,
    ]);
    res.json({ result: "Success" });
  } catch (err) {
    console.log(err);
  }
};

export const createReview = async (req: Request, res: Response) => {
  const { restaurantid } = req.params;
  const { name, review, rating } = req.body;
  try {
    const results = await db.query(
      "INSERT INTO reviews (restaurant_id,name,review,rating) values($1,$2,$3,$4) RETURNING *",
      [restaurantid, name, review, rating]
    );
    res.json({ data: results.rows[0] });
  } catch (err) {
    console.log(err);
  }
};
