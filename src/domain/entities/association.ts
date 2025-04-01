export class Association {
  constructor(
    private readonly id: string,
    private name: string,
    private address?: string
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
}
