import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { verify } from "jsonwebtoken";

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
    this.route.post("/regis", this.authController.regis);
    this.route.post("/login", this.authController.login);
    this.route.get("/keeplogin/:email", this.authController.keepLogin);

    this.route.patch(
      "/update-contact",
      (req: Request, res: Response, next: NextFunction) => {
        try {
          // Proses read token dari request header
          const token = req.header("Authorization")?.split(" ")[1];
          console.log("THIS IS TOKEN", token);
          if (!token) {
            throw { rc: 404, message: "Token not exist" };
          }

          // Proses penerjemahan token menjadi data asalnya
          const checkToken = verify(
            token,
            process.env.TOKEN_KEY || "secretKey"
          );

          console.log(checkToken);
          res.locals.decript = checkToken;
          next();
        } catch (error) {
          next(error);
        }
      },
      this.authController.updateContact
    );
  }

  // public methode for expose route methode
  getRoute(): Router {
    return this.route;
  }
}
