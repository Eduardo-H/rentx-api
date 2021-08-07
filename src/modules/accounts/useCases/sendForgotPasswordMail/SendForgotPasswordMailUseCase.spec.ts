import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "253481",
      email: "eduardo@rentx.com",
      name: "Eduardo Oliveira",
      password: "12345"
    });

    await sendForgotPasswordMailUseCase.execute("eduardo@rentx.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a mail to an nonexistent user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("test@test.com")
    ).rejects.toEqual(new AppError("User not found"));
  });

  it("should be able to create a token", async () => {
    const generateToken = jest.spyOn(usersRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "253481",
      email: "eduardo@rentx.com",
      name: "Eduardo Oliveira",
      password: "12345"
    });

    await sendForgotPasswordMailUseCase.execute("eduardo@rentx.com");

    expect(generateToken).toHaveBeenCalled();
  });
});
