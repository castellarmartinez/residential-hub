import { Booking } from "../../../domain/entities/booking";

export interface GetBookingsUseCase {
  execute(): Promise<Booking[]> | never;
}
