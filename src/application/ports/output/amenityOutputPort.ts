import { Amenity } from "../../../domain/entities/amenity";

export interface AmenityOutputPort {
  save(amenity: Amenity): Promise<void> | never;
  findAll(): Promise<Amenity[]> | never;
  findById(id: string): Promise<Amenity> | never;
  update(
    id: string,
    fieldsToUpdate: Partial<Amenity>
  ): Promise<Amenity> | never;
  delete(id: string): Promise<void> | never;
}
