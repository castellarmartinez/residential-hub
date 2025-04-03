import { Amenity } from "../../../domain/entities/amenity";

export interface GetAmenitiesUseCase {
  execute(): Promise<Amenity[]> | never;
}
