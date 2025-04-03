import express from "express";
import { MongoBookingRepository } from "../../../output/mongo/mongoBookingRepository";
import { BookingController } from "../controllers/bookingController";
import { BookingMiddleware } from "../middlewares/bookingMiddleware";
import { validateId } from "../middlewares/validateParamsId";
import { CreateBookingInputPort } from "../../../../../application/ports/input/booking/createBookingInputPort";
import { GetBookingsInputPort } from "../../../../../application/ports/input/booking/getBookingsInputPort";
import { GetBookingByIdInputPort } from "../../../../../application/ports/input/booking/getBookinByIdInputPort";
import { UpdateBookingInputPort } from "../../../../../application/ports/input/booking/updateBookingInputPort";
import { DeleteBookingInputPort } from "../../../../../application/ports/input/booking/deleteBookingInputPort";

export const bookingRouter = express.Router();

const bookingRepository = new MongoBookingRepository();

const createBookingUseCase = new CreateBookingInputPort(bookingRepository);
const getBookingsUseCase = new GetBookingsInputPort(bookingRepository);
const getBookingByIdUseCase = new GetBookingByIdInputPort(bookingRepository);
const updateBookingUseCase = new UpdateBookingInputPort(bookingRepository);
const deleteBookingUseCase = new DeleteBookingInputPort(bookingRepository);

const bookingController = new BookingController(
  createBookingUseCase,
  getBookingsUseCase,
  getBookingByIdUseCase,
  updateBookingUseCase,
  deleteBookingUseCase
);

const bookingMiddleware = new BookingMiddleware();

bookingRouter.post(
  "/",
  bookingMiddleware.validateCreationFields,
  bookingController.create
);

bookingRouter.get("/", bookingController.getAll);

bookingRouter.get("/:id", validateId, bookingController.getById);

bookingRouter.patch(
  "/:id",
  validateId,
  bookingMiddleware.validateUpdateFields,
  bookingController.update
);

bookingRouter.delete("/:id", validateId, bookingController.delete);
