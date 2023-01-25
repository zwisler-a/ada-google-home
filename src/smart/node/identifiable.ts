export class Identifiable {
  identifier: string;
  name: string;
  description: string;

  static from(identifier: string, name: string, description: string) {
    const i = new Identifiable();
    i.identifier = identifier;
    i.name = name;
    i.description = description;
    return i;
  }
}
