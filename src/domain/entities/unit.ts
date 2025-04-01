export class Unit {
  constructor(
    public readonly id: string,
    public name: string,
    public associationId?: string,
    public users?: string[]
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
