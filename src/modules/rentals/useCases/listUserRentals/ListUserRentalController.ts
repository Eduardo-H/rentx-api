import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserRentalsUseCase } from "./ListUserRentalsUseCase";

class ListUserRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase);

    const rentals = await listUserRentalsUseCase.execute(id);

    return response.status(200).json(rentals);
  }
}

export { ListUserRentalsController };
