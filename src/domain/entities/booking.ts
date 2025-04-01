export class Booking {
  constructor(
    private readonly id: string,
    private timeStart?: string,
    private timeEnd?: string,
    private userId?: string,
    private amenityId?: string,
    private associationId?: string
  ) {}

  // Getters
  public getId() {
    return this.id;
  }

  public getTimeStart() {
    return this.timeStart;
  }

  public getTimeEnd() {
    return this.timeEnd;
  }

  public getUserId() {
    return this.userId;
  }

  public getAmenity() {
    return this.amenityId;
  }

  public getAssociationId() {
    return this.associationId;
  }
}
