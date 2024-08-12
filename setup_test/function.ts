import prisma from "./client";

export async function getUser() {
  return await prisma.user.findFirst();
}
