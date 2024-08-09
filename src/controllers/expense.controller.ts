import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

export class ExpenseController {
  async getDataExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await prisma.track.findMany();

      return res.status(200).send({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  }
}
