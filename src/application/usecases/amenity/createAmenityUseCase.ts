import { Amenity } from "../../../domain/entities/amenity";

export interface CreateAmenityUseCase {
  execute(
    name: string,
    description: string,
    bookable: boolean,
    openingTime: string,
    closingTime: string,
    association: string
  ): Promise<Amenity> | never;
}
