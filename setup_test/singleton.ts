// setup_test/singleton.ts
import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = require("./client").default as DeepMockProxy<PrismaClient>;

export { prismaMock };
