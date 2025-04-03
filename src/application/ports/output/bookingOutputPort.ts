import { Booking } from "../../../domain/entities/booking";

export interface BookingOutputPort {
  save(user: Booking): Promise<void> | never;
  findAll(): Promise<Booking[]> | never;
  findById(id: string): Promise<Booking> | never;
  update(
    id: string,
    fieldsToUpdate: Partial<Booking>
  ): Promise<Booking> | never;
  delete(id: string): Promise<void> | never;
}
