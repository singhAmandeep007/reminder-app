import { v4 as uuidv4 } from "uuid";

class IdentityManager {
  ids: Set<string>;

  constructor() {
    this.ids = new Set<string>();
  }

  // Returns a new unused unique identifier.
  fetch() {
    let uuid = uuidv4();
    while (this.ids.has(uuid)) {
      uuid = uuidv4();
    }

    this.ids.add(uuid);

    return uuid;
  }

  // Registers an identifier as used. Must throw if identifier is already used.
  set(id: string) {
    if (this.ids.has(id)) {
      throw new Error(`ID ${id} has already been used.`);
    }

    this.ids.add(id);
  }

  // Resets all used identifiers to unused.
  reset() {
    this.ids.clear();
  }
}

export { IdentityManager };
