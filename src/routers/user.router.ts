import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  // define private methode
  private route: Router;
  private userController: UserController;

  constructor() {
    this.route = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  // private methode for initialize routing to controller
  private initializeRoutes(): void {
    this.route.post("/regis", this.userController.regis);
    this.route.post("/login", this.userController.login);
  }

  // public methode for expose route methode
  getRoute(): Router {
    return this.route;
  }
}
