import { DeleteBookingUseCase } from "../../../usecases/booking/deleteBookingUseCase";
import { BookingOutputPort } from "../../output/bookingOutputPort";

export class DeleteBookingInputPort implements DeleteBookingUseCase {
  constructor(private readonly  bookingRepository: BookingOutputPort) {}

  public async execute(id: string): Promise<void> | never {
    return this.bookingRepository.delete(id);
  }
}
