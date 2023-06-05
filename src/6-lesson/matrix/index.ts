type MatrixCoords = {
  x: number;
  y: number;
  z: number;
}

export class Matrix3d {
  #buffer;

  #xSize;
  #ySize;
  #zSize;

  constructor({xSize, ySize, zSize}: {
    xSize: number,
    ySize: number,
    zSize: number,
  }) {
    this.#xSize = xSize;
    this.#ySize = ySize;
    this.#zSize = zSize;

    this.#buffer = new Array(xSize * ySize * zSize)
  }

  getBuffer() {
    return this.#buffer;
  }

  #getIndex({x, y, z}: MatrixCoords) {
    return (z * this.#ySize + y) * this.#xSize + x;
  }

  get({x, y, z}: MatrixCoords) {
    return this.#buffer[this.#getIndex({x, y, z})];
  }

  set({x, y, z}: MatrixCoords, value: number | string) {
    this.#buffer[this.#getIndex({x, y, z})] = value
  }

  *[Symbol.iterator]() {
    for (let z = 0; z < this.#zSize; z++) {
      for (let y = 0; y < this.#ySize; y++) {
        for (let x = 0; x < this.#xSize; x++) {
          yield [
            {x, y, z},
            this.#getIndex({x, y, z: z})
          ]
        }
      }
    }
  }
}

const m = new Matrix3d({xSize: 2, ySize: 2, zSize: 2})

m.set({x: 0, y: 0, z: 0}, 1);
m.set({x: 1, y: 0, z: 0}, 2);
m.set({x: 0, y: 1, z: 0}, 3);
m.set({x: 1, y: 1, z: 0}, 4);

m.set({x: 0, y: 0, z: 1}, 5);
m.set({x: 1, y: 0, z: 1}, 6);
m.set({x: 0, y: 1, z: 1}, 7);
m.set({x: 1, y: 1, z: 1}, 8);

// console.log(...m);