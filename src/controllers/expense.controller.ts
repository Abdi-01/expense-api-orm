import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { redisClient } from "../utils/redisClient";

export class ExpenseController {
  async getDataExpense(req: Request, res: Response, next: NextFunction) {
    try {
      // Check data in redis
      const redisData = await redisClient.get("expense-all-byId");
      console.log("FROM REDIS", redisData);

      if (redisData) {
        return res.status(200).send({
          success: true,
          result: JSON.parse(redisData),
        });
      }

      const data = await prisma.track.findMany({
        include: {
          user: true,
        },
        where: {
          userId: res.locals.decript.id,
        },
      });

      // Set data to redis
      await redisClient.setEx("expense-all-byId", 10, JSON.stringify(data));

      return res.status(200).send({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  }
}
