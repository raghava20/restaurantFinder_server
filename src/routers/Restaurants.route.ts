import express from "express";
import {
  createRestaurant,
  deleteOneRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateOneRestaurant,
} from "../controllers/Restaurants.controller";

const router = express.Router();

router.get("/", getAllRestaurants);
router.get("/:restaurantsid", getOneRestaurant);

router.post("/", createRestaurant);

router.put("/:restaurantid", updateOneRestaurant);

router.delete("/:restaurantid", deleteOneRestaurant);

export const restaurantsRouter = router;
