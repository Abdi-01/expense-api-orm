import { getUser } from "../../setup_test/function";
import { prismaMock } from "../../setup_test/singleton";

test("Should return an array from get data users", async () => {
  prismaMock.user.findFirst.mockResolvedValueOnce({
    id: 1,
    email: "mockedo@mail.com",
    password: "mockEdo123",
    limitWrongPassword: 0,
    imgProfile: "url",
    isBlocked: false,
    noTelp: "0897736363",
  });

  const result = await getUser();

  expect(result).toEqual({
    id: 3,
    email: "edi@mail.com",
    noTelp: "08727373737",
    password: "$2b$10$Qe9W.lyADtDJDOAFMjH4q.biEtgfWeWK1QHN8JwV0gi4nqAcZnxJG",
    isBlocked: false,
    limitWrongPassword: 0,
    imgProfile: null,
  });
});
