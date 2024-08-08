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

    return { success: true, data: user };
  } catch (error) {
    return error;
  }
};

export const checkPassword = async (reqPass: string, dataUser: any) => {
  try {
    const { id, password, limitWrongPassword } = dataUser;
    const comparePass = compareSync(reqPass, password);
    if (!comparePass) {
      if (limitWrongPassword < Number(process.env.MAX_FORGOT_PASSWORD)) {
        await updateUser(id, {
          limitWrongPassword: limitWrongPassword + 1,
        });
        throw {
          success: false,
          message: `Password is wrong ${limitWrongPassword + 1}/${
            process.env.MAX_FORGOT_PASSWORD
          }`,
        };
      } else {
        throw {
          success: false,
          message: `Your account is blocked`,
        };
      }
    } else {
      await updateUser(id, {
        limitWrongPassword: 0,
      });
      return { success: true };
    }
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id: number, newData: any) => {
  try {
    await prisma.user.update({ where: { id }, data: newData });
    return { success: true };
  } catch (error) {
    return error;
  }
};
