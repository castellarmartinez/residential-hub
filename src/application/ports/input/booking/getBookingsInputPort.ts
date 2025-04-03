import { Booking } from "../../../../domain/entities/booking";
import { GetBookingsUseCase } from "../../../usecases/booking/getBookingsUseCase";
import { BookingOutputPort } from "../../output/bookingOutputPort";

export class GetBookingsInputPort implements GetBookingsUseCase {
  constructor(private readonly bookingRepository: BookingOutputPort) {}

  public async execute(): Promise<Booking[]> | never {
    return this.bookingRepository.findAll();
  }
}
