import { Amenity } from "../../../domain/entities/amenity";

export interface GetAmenityByIdUseCase {
  execute(id: string): Promise<Amenity> | never;
}
