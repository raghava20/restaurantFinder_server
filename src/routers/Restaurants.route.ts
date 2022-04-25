import express from "express";
import {
  createRestaurant,
  createReview,
  deleteOneRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateOneRestaurant,
} from "../controllers/Restaurants.controller";

const router = express.Router();

router.get("/", getAllRestaurants);
router.get("/:restaurantid", getOneRestaurant);

router.post("/", createRestaurant);

router.put("/:restaurantid", updateOneRestaurant);

router.delete("/:restaurantid", deleteOneRestaurant);

router.post("/:restaurantid/addReview", createReview);

export const restaurantsRouter = router;
