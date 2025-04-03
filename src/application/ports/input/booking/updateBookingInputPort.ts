import { Booking } from "../../../../domain/entities/booking";
import { UpdateBookingUseCase } from "../../../usecases/booking/updateBookingUseCase";
import { BookingOutputPort } from "../../output/bookingOutputPort";

export class UpdateBookingInputPort implements UpdateBookingUseCase {
  constructor(private readonly bookingRepository: BookingOutputPort) {}

  public async execute(
    id: string,
    fieldsToUpdate: Partial<Booking>
  ): Promise<Booking> | never {
    return this.bookingRepository.update(id, fieldsToUpdate);
  }
}
