import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Proses read token dari request header
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("THIS IS TOKEN", token);
    if (!token) {
      throw { rc: 404, message: "Token not exist" };
    }

    // Proses penerjemahan token menjadi data asalnya
    const checkToken = verify(token, process.env.TOKEN_KEY || "secretKey");

    console.log(checkToken);
    res.locals.decript = checkToken;
    next();
  } catch (error) {
    next(error);
  }
};
