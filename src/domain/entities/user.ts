export class User {
  constructor(
    private readonly id: string,
    private email: string,
    private password: string,
    private lastNames?: string,
    private names?: string,
    private associations?: string[],
    private units?: string[]
  ) {}

  // Getters
  public getId() {
    return this.id;
  }

  public getNames() {
    return this.names;
  }

  public getLastNames() {
    return this.lastNames;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getAssociations() {
    return this.associations;
  }

  public getUnits() {
    return this.units;
  }
}
