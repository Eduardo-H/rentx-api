import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListUserRentalsController } from "@modules/rentals/useCases/listUserRentals/ListUserRentalController";
import { RentalDevolutionController } from "@modules/rentals/useCases/rentalDevolution/RentalDevolutionController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalDevolutionController = new RentalDevolutionController();
const listUserRentalsController = new ListUserRentalsController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  rentalDevolutionController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listUserRentalsController.handle
);

export { rentalRoutes };
