import { Router } from "express";
import UserController from "./Controllers/UserController";
import ProductController from "./Controllers/ProductController";

export const router = Router();

/* HOME */
router.post("/login", UserController.signIn);
router.post("/register", UserController.signUp);


/* USERS */
router.get("/users", UserController.findAll);


/* Products */

router.get("/products", ProductController.findAll);
router.post("/products", ProductController.createProduct);
