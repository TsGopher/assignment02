import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import auth from "./middlewares/auth";
import { authRoute } from "./modules/auth/auth.route";
import { ROLE } from "./modules/auth/auth.schema";
import { vehiclesRoute } from "./modules/vehicles/vehicles.route";
import { userRoute } from "./modules/users/user.route";
import { bookingRoute } from "./modules/bookings/booking.route";

const app = express();

app.use(express.json());

initDB();

const api_versioning = "/api/v1";

app.use(`${api_versioning}/auth`, authRoute);
app.use(`${api_versioning}/vehicles`, vehiclesRoute)
app.use(`${api_versioning}/users`, userRoute)
app.use(`${api_versioning}/bookings`, bookingRoute)

app.get("/", auth(ROLE.CUSTOMER), (req, res) => {
  res.send("Vehicle Rent: Application 🎉");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path,
  });
});

export default app;
