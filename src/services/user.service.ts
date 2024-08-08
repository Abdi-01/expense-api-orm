import { compareSync } from "bcrypt";
import prisma from "../prisma";
import { hashPassword } from "../utils/hash";

type UserRegis = {
  email: string;
  password: string;
};
export const createUser = async (data: UserRegis) => {
  try {
    await prisma.user.create({
      data: {
        email: data.email,
        password: await hashPassword(data.password),
      },
    });
    return { success: true };
  } catch (error) {
    return error;
  }
};

export const findUniqueUser = async (data: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: data,
    });

    return { success: true, user };
  } catch (error) {
    return error;
  }
};

export const checkPassword = async (reqPass: string, dataUser: any) => {
  try {
    const comparePass = compareSync(reqPass, dataUser.password);
    if (!comparePass) {
      if (
        dataUser.limitWrongPassword < Number(process.env.MAX_FORGOT_PASSWORD)
      ) {
        await prisma.user.update({
          where: { id: dataUser.id },
          data: { limitWrongPassword: dataUser.limitWrongPassword + 1 },
        });
        return {
          success: false,
          message: `Password is wrong ${dataUser.limitWrongPassword + 1}/${
            process.env.MAX_FORGOT_PASSWORD
          }`,
        };
      } else {
        return {
          success: false,
          message: `Your account is blocked`,
        };
      }
    } else {
      return { success: true };
    }
  } catch (error) {
    return error;
  }
};
