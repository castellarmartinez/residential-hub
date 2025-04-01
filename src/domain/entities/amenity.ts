export class Amenity {
  constructor(
    private readonly id: string,
    private name: string,
    private description?: string,
    private bookable?: boolean,
    private openingTime?: string,
    private closingTime?: string,
    private associationId?: string
  ) {}

  // Getters
  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getBookable() {
    return this.bookable;
  }

  public getOpeningTime() {
    return this.openingTime;
  }

  public getClosingTime() {
    return this.closingTime;
  }

  public getAssociationId() {
    return this.associationId;
  }
}
