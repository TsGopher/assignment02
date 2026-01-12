import { Router } from "express";
import auth from "../../middlewares/auth";
import { ROLE } from "../auth/auth.schema";
import { bookingController } from "./booking.controllers";

const router = Router();

router.post(
  "/",
  auth(ROLE.ADMIN || ROLE.CUSTOMER),
  bookingController.createBooking
);
router.get(
  "/",
  auth(ROLE.ADMIN || ROLE.CUSTOMER),
  bookingController.getBookings
);

router.put(
  "/:bookingId",
  auth(ROLE.ADMIN || ROLE.CUSTOMER),
  bookingController.updateBookings
);
export const bookingRoute = router;
