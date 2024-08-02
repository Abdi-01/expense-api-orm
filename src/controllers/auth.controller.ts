import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { hashPassword } from "../utils/hash";
import { compareSync } from "bcrypt";
import { createToken } from "../utils/jwt";

interface IUser {
  email: string;
  noTelp?: string;
  password: string;
}

export class AuthController {
  // define your methode controller below
  async regis(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

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
      next({
        success: false,
        message: "FAILED create account",
        error,
      });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
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
            token: createToken(
              { id: findUser.id, email: findUser.email },
              "24h"
            ),
          },
        });
      } else {
        throw {
          rc: 404,
          message: "Account not exist",
        };
      }
    } catch (error: any) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const findUser = await prisma.user.findUnique({
        where: {
          email: req.params.email,
        },
      });

      if (findUser) {
        return res.status(200).send({
          success: true,
          result: {
            email: findUser?.email,
            noTelp: findUser?.noTelp,
            token: createToken(
              { id: findUser.id, email: findUser.email },
              "24h"
            ),
          },
        });
      } else {
        throw { rc: 401, message: "Account unauthorized" };
      }
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("RES DECRIPT TOKEN", res.locals.decript);

      if (res.locals.decript.id) {
        const updatePhone = await prisma.user.update({
          data: {
            noTelp: req.body.noTelp,
          },
          where: {
            id: res.locals.decript.id,
          },
        });

        return res.status(200).send({
          success: true,
          result: updatePhone,
        });
      }

      throw { rc: 401, message: "Update unauthorize" };
    } catch (error) {
      next(error);
    }
  }
}
