import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dateAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol",
      description: "Cheap car",
      daily_rate: 60,
      license_plate: "GOL-1234",
      fine_amount: 40,
      category_id: "1234",
      brand: "Volkswagem"
    });

    const rental = await createRentalUseCase.execute({
      user_id: "54321",
      car_id: car.id as string,
      expected_return_date: dateAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental with an user with an open rental", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "54321",
      car_id: "85002",
      expected_return_date: dateAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "54321",
        car_id: "95112",
        expected_return_date: dateAdd24Hours
      })
    ).rejects.toEqual(new AppError("This user already has an open rental"));
  });

  it("should not be able to create a new rental with a unavailable car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "450256",
      car_id: "12345",
      expected_return_date: dateAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "24234",
        car_id: "12345",
        expected_return_date: dateAdd24Hours
      })
    ).rejects.toEqual(new AppError("This car is not available"));
  });

  it("should not be able to create a new with the duration bellow the minimum", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "54321",
        car_id: "12345",
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(
      new AppError("The rental has a duration bellow the minimum hours")
    );
  });
});
