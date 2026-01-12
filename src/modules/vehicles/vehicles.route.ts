import { Router } from "express";
import auth from "../../middlewares/auth";
import { ROLE } from "../auth/auth.schema";
import { vehiclesController } from "./vehicles.controllers";

const router = Router();

router.post("/", auth(ROLE.ADMIN), vehiclesController.createVehicles);
router.get("/", vehiclesController.getVehicles);
router.get("/:id", vehiclesController.getVehicle);
router.put("/:id", auth(ROLE.ADMIN), vehiclesController.updateVehicle);
router.delete("/:id", auth(ROLE.ADMIN), vehiclesController.deleteVehicle);

export const vehiclesRoute = router;
