import { Router } from "express";
import UserController from "./Controllers/UserController";

export const router = Router();

/* HOME */
router.post("/login", UserController.signIn);
router.post("/register", UserController.signUp);


/* USERS */
router.get("/users", UserController.findAll);
