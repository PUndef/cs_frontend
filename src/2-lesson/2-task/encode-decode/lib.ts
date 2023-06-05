import { NormalizedSchema, UintArraySize } from "../types"

export const createMask = (size: number, offset: number = 0) => {
  return (2 ** 32 - 1 >>> 32 - size) << offset
}

export const getUintArray = (size: UintArraySize) => {
  switch (true) {
    case (size === 8):
      return Uint8Array
    case (size === 16):
      return Uint16Array
    default:
      return Uint32Array
  }
}

export const getViewMaxSize = (normalizedSchema: NormalizedSchema) => {
  return Math.max(...normalizedSchema.map(
    ({size}) => {
      switch (true) {
        case size <= 8:
          return 8;
        case size <= 16:
          return 16;
        default:
          return 32;
      }
    }
  )) as UintArraySize
}
