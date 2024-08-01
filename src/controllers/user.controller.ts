import { Request, Response } from "express";
import prisma from "../prisma";
import { hashPassword } from "../utils/hash";
import { compareSync } from "bcrypt";

interface IUser {
  email: string;
  noTelp?: string;
  password: string;
}

export class UserController {
  // define your methode controller below
  async regis(req: Request, res: Response) {
    try {
      await prisma.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
        },
      });

      return res.status(201).send({
        success: true,
        message: "Your account is created",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "FAILED create account",
        error,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const findUser = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (findUser) {
        const comparePass = compareSync(req.body.password, findUser.password);
        if (!comparePass) {
          throw {
            rc: 401,
            message: "Your password is wrong",
          };
        }

        return res.status(200).send({
          success: true,
          result: {
            email: findUser.email,
            noTelp: findUser.noTelp,
          },
        });
      } else {
        throw {
          rc: 404,
          message: "Account not exist",
        };
      }
    } catch (error: any) {
      console.log(error);
      return res.status(error.rc || 500).send({
        success: false,
        message: error.message,
      });
    }
  }
}
