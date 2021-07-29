import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dateAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "54321",
      car_id: "12345",
      expected_return_date: dateAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental with an user with an open rental", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "12345",
        expected_return_date: dateAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "95112",
        expected_return_date: dateAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with a unavailable car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "12345",
        expected_return_date: dateAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "24234",
        car_id: "12345",
        expected_return_date: dateAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new with the duration bellow the minimum", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "12345",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
