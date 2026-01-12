import { Router } from "express";
import { authController } from "./auth.controllers";
import { signupSchema } from "./auth.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.post("/signup", validate(signupSchema), authController.SignupController);
router.post("/signin", authController.LoginController);

export const authRoute = router;
