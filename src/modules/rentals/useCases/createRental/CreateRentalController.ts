import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { car_id, expected_return_date } = request.body;

    const createRentalUSeCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUSeCase.execute({
      user_id: id,
      car_id,
      expected_return_date
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
