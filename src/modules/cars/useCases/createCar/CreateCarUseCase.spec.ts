import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Focus",
      description: "A cool hatchback",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Ford",
      category_id: "Sedan"
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an existent license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Focus",
        description: "A cool hatchback",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 50,
        brand: "Ford",
        category_id: "Sedan"
      });

      await createCarUseCase.execute({
        name: "Camaro",
        description: "The agressive sport car",
        daily_rate: 250,
        license_plate: "ABC-1234",
        fine_amount: 100,
        brand: "Mustang",
        category_id: "Sport"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Focus",
      description: "A cool hatchback",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Ford",
      category_id: "Sedan"
    });

    expect(car.available).toBe(true);
  });
});
