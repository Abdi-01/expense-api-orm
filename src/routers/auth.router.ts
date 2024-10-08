import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken";
import { regisValidation } from "../middleware/validator/regis";
import { uploader } from "../middleware/uploader";

export class AuthRouter {
  // define private methode
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  // private methode for initialize routing to controller
  private initializeRoutes(): void {
    this.route.post("/regis", regisValidation, this.authController.regis);
    this.route.post("/login", this.authController.login);
    this.route.get("/keeplogin", verifyToken, this.authController.keepLogin);

    this.route.patch(
      "/update-contact",
      verifyToken,
      this.authController.updateContact
    );

    this.route.patch(
      "/img-profile",
      verifyToken,
      uploader("/profile", "PRF").single("img"),
      this.authController.updateImgProfile
    );
  }

  // public methode for expose route methode
  getRoute(): Router {
    return this.route;
  }
}
