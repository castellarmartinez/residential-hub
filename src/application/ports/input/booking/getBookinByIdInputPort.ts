import { Booking } from "../../../../domain/entities/booking";
import { GetBookingByIdUseCase } from "../../../usecases/booking/getBookingByIdUseCase";
import { BookingOutputPort } from "../../output/bookingOutputPort";

export class GetBookingByIdInputPort implements GetBookingByIdUseCase {
  constructor(private readonly bookingRepository: BookingOutputPort) {}

  public async execute(id: string): Promise<Booking> | never {
    return this.bookingRepository.findById(id);
  }
}
