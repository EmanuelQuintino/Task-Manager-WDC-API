import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleAuthorizationMiddleware } from "../middlewares/roleAuthorizationMiddleware";

export const salesRoutes = Router();

salesRoutes.use(authMiddleware, roleAuthorizationMiddleware(["admin"]));
salesRoutes.get("/sales", taskControllers.read);
