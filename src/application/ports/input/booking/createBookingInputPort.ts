import { v4 as uuidv4 } from "uuid";

import { Booking } from "../../../../domain/entities/booking";
import { CreateBookingUseCase } from "../../../usecases/booking/createBookingUseCase";
import { BookingOutputPort } from "../../output/bookingOutputPort";

export class CreateBookingInputPort implements CreateBookingUseCase {
  constructor(private readonly bookingRepository: BookingOutputPort) {}

  public async execute(
    date: string,
    timeStart: string,
    timeEnd: string
  ): Promise<Booking> | never {
    const booking = new Booking(uuidv4(), date, timeStart, timeEnd);
    await this.bookingRepository.save(booking);

    return booking;
  }
}
