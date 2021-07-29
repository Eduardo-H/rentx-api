import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol",
      description: "An economic car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 80,
      brand: "Volkswagem",
      category_id: "category_id"
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Focus",
      description: "The luxary sedan",
      daily_rate: 150,
      license_plate: "ABC-4321",
      fine_amount: 120,
      brand: "Ford",
      category_id: "category_id"
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Ford"
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "R8",
      description: "The best sport/super car",
      daily_rate: 500,
      license_plate: "RXM-8000",
      fine_amount: 500,
      brand: "Audi",
      category_id: "category_id"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "R8"
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno",
      description: "The fastest car ever created (has a letter on top)",
      daily_rate: 50,
      license_plate: "ZUM-9999",
      fine_amount: 20,
      brand: "Fiat",
      category_id: "12345"
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    });

    expect(cars).toEqual([car]);
  });
});
