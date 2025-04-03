export class Association {
  constructor(
    private readonly id: string,
    private name: string,
    private address?: string,
    private units?: string[],
    private users?: string[]
  ) {}

  // Getters
  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getAddress() {
    return this.address;
  }

  public getUnits() {
    return this.units;
  }

  public getUsers() {
    return this.users;
  }
}
