import { NextFunction, Request, Response, Router } from "express";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken";
import { ExpenseController } from "../controllers/expense.controller";

export class ExpenseRouter {
  // define private methode
  private route: Router;
  private expenseController: ExpenseController;

  constructor() {
    this.route = Router();
    this.expenseController = new ExpenseController();
    this.initializeRoutes();
  }

  // private methode for initialize routing to controller
  private initializeRoutes(): void {
    this.route.get("/", this.expenseController.getDataExpense);
  }

  // public methode for expose route methode
  getRoute(): Router {
    return this.route;
  }
}
