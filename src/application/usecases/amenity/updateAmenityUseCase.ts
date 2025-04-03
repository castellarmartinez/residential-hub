import { Amenity } from "../../../domain/entities/amenity";

export interface UpdateAmenityUseCase {
  execute(id: string, fieldsToUpdate: Partial<Amenity>): Promise<Amenity> | never;
}
