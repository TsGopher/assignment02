import { Router } from "express";
import auth from "../../middlewares/auth";
import { ROLE } from "../auth/auth.schema";
import { userControllers } from "./user.controllers";

const router = Router();

router.get("/", auth(ROLE.ADMIN), userControllers.getUsers);
router.put("/:id", auth(ROLE.ADMIN), userControllers.updateUser);
router.delete("/:id", auth(ROLE.ADMIN), userControllers.deleteUser);

export const userRoute = router;
