import dotenv from "dotenv";
dotenv.config();
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { UserRouter } from "./routers/user.router";

const PORT = process.env.PORT;

class App {
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  //   configure methode
  private configure(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  //   To define routes or controllers config api
  private routes(): void {
    this.app.get("/api", (req: Request, res: Response) => {
      return res.status(200).send("<h1>Welcome to Expense API</h1>");
    });

    // define route
    const userRouter = new UserRouter();
    this.app.use("/auth", userRouter.getRoute());
  }

  // define error handling middleware
  private handleError(): void {
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.log(error);

        const statusCode = error.rc || 500;
        return res.status(statusCode).send({
          success: false,
          error,
        });
      }
    );
  }

  public async start(): Promise<void> {
    this.app.listen(PORT, () =>
      console.log(
        `PRISMA API for EXPENSE APP RUNNING : http://localhost:${PORT}`
      )
    );
  }
}

export default App;
