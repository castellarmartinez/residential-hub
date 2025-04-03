import { NextFunction, Request, Response } from "express";
import { CreateBookingUseCase } from "../../../../../application/usecases/booking/createBookingUseCase";
import { GetBookingsUseCase } from "../../../../../application/usecases/booking/getBookingsUseCase";
import { GetBookingByIdUseCase } from "../../../../../application/usecases/booking/getBookingByIdUseCase";
import { UpdateBookingUseCase } from "../../../../../application/usecases/booking/updateBookingUseCase";
import { DeleteBookingUseCase } from "../../../../../application/usecases/booking/deleteBookingUseCase";

export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly getBookingsUseCase: GetBookingsUseCase,
    private readonly getBookingByIdUseCase: GetBookingByIdUseCase,
    private readonly updateBookingUseCase: UpdateBookingUseCase,
    private readonly deleteBookingUseCase: DeleteBookingUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date, timeStart, timeEnd } = req.body;

      const booking = await this.createBookingUseCase.execute(
        date,
        timeStart,
        timeEnd
      );

      res.status(201).json({
        booking,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.getBookingsUseCase.execute();

      res.status(200).json({
        bookings,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const booking = await this.getBookingByIdUseCase.execute(id);

      res.status(200).json({
        booking,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const booking = await this.updateBookingUseCase.execute(id, req.body);

      res.status(200).json({ booking });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.deleteBookingUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
