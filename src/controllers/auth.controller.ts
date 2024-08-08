import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { hashPassword } from "../utils/hash";
import { compareSync } from "bcrypt";
import { createToken } from "../utils/jwt";
import { sendEmail } from "../utils/emailSender";
import {
  checkPassword,
  createUser,
  findUniqueUser,
} from "../services/user.service";

interface IUser {
  email: string;
  noTelp?: string;
  password: string;
}

export class AuthController {
  // define your methode controller below
  async regis(req: Request, res: Response, next: NextFunction) {
    try {
      await createUser(req.body);

      await sendEmail(req.body.email, "Regster Account", null, {
        email: req.body.email,
        otp: "7654",
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
      const findUser: any = await findUniqueUser({
        email: req.body.email,
      });

      if (findUser.success) {
        const checkPass: any = await checkPassword(
          req.body.password,
          findUser.data
        );

        if (checkPass.success) {
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
          throw checkPass;
        }
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
          id: res.locals.decript.id,
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

  async updateImgProfile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("LOG FROM FILE CONTROLLER");

      console.log("FILE UPLOAD INFO :", req.file);
      if (res.locals.decript.id) {
        await prisma.user.update({
          data: {
            imgProfile: `/assets/${req.file?.filename}`,
          },
          where: {
            id: res.locals.decript.id,
          },
        });
      }
      return res.status(200).send({
        success: true,
        message: `Update img profile success`,
      });
    } catch (error) {
      next(error);
    }
  }
}
