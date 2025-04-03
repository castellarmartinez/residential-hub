import { Amenity } from "../../../domain/entities/amenity";

export interface GetAmenitiesUseCase {
  execute(association?: string): Promise<Amenity[]> | never;
}
