import Restaurant from "../models/Restaurant.js";

export const getRestaurants = (req, res, next) => {
  Restaurant.find({}).exec((error, restaurants) => {
    if (error) {
      return res.status(400).json(error);
    }
    if (restaurants) {
      res.status(200).json({ restaurants });
    }
  });
};

export const addRestaurant = (req, res, next) => {
  const restaurantObj = {
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  };
  const restaurant = new Restaurant(restaurantObj);
  restaurant.save((error, rest) => {
    if (error) {
      return res.status(400).json(error);
    }
    if (rest) {
      return res.status(201).json({ restaurant: rest });
    }
  });
};
