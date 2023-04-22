export type BinaryValue = 0 | 1;

const toBinary = (number: number) => (number).toString(2).padStart(8, '0');

export const createBitFactory = function(arr: Uint8Array) {
  const bytes: Uint8Array = arr;

  const _validate = (byteIndex: number, bitIndex: number) => {
    if (byteIndex > bytes.length) {
      throw new Error('Byte index more than bytes length!')
    }
    if (bitIndex > toBinary(bytes[byteIndex]).length) {
      throw new Error('Bit index more than binary length!')
    }
  }

  const _getBit = (number: number, bitIndex: number): BinaryValue => {
    const mask = 1 << bitIndex;
    return (number & mask) != 0 ? 1 : 0
  }

  const _setBit = (byteIndex: number, bitIndex: number, value: BinaryValue): void => {
    const mask = 1 << bitIndex;
    if (value === 1) {
      bytes[byteIndex] = bytes[byteIndex] | (mask);
    } else {
      bytes[byteIndex] = bytes[byteIndex] &~ mask;
    }
  }

  const get = (byteIndex: number, bitIndex: number): BinaryValue => {
    _validate(byteIndex, bitIndex);
    return _getBit(bytes[byteIndex], bitIndex)
  }

  const set = (byteIndex: number, bitIndex: number, value: BinaryValue): void => {
    _validate(byteIndex, bitIndex);
    _setBit(byteIndex, bitIndex, value);
  }

  return {get, set}
}
