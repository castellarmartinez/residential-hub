export class Unit {
  constructor(
    private readonly id: string,
    private name: string,
    private associationId?: string,
    private users?: string[]
  ) {}

  // Getters
  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getAssociationId() {
    return this.associationId;
  }

  public getUsers() {
    return this.users;
  }
}
