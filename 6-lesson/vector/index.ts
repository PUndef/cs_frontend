type VectorConfiguration = {
  capacity: number
}

export class Vector {
  #capacity;
  #buffer;

  constructor(
    ArrConstructor: TypedArrayConstructor,
    config: VectorConfiguration,
  ) {
    this.#buffer = new ArrConstructor();
    this.#capacity = config.capacity;
  }

  get length() {
    return this.#buffer.length
  }
}