import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumRentalDurationInHours = 24;

    // Verifying if the car is already in an open rental
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("This car is not available");
    }

    // Verifying if the user is already in an open rental
    const userWithOpenRental =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userWithOpenRental) {
      throw new AppError("This user already has an open rental");
    }

    // Verifying if the user is already in an open rental
    const compare = this.dateProvider.compareInHours(
      this.dateProvider.getCurrentDate(),
      expected_return_date
    );

    if (compare < minimumRentalDurationInHours) {
      throw new AppError(
        `The rental has a duration bellow the minimum of ${minimumRentalDurationInHours} hours`
      );
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
