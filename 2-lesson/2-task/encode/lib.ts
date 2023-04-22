import { ASCII_BIT_SIZE, ERROR_MESSAGES } from "../constants";
import { Schema } from "../types";

/**
 * Get optimal size for write all bits in Uint8Array's
 */
export const getSize = (schema: Schema) => {
  const bitQty = [...schema].reduce((prev, elem) => prev + elem[0], 0);
  return Math.ceil(bitQty / 8);
}

export const getSchemaIndex = (index: number, schemaArg: Schema) => {
  const schema = [...schemaArg];
  if (index > schema.length) {
    throw new Error(ERROR_MESSAGES.INDEX_OUT_OF_SCHEMA);
  }

  if (index === 0) return 0;

  let result = 0;
  for (let i = 0; i < index; i++) {
    result += schema[i][0];
  }
  return result;
}

const truncateBits = (value: number, bits: number) => {
  return value & (2 ** 32 - 1 >>> (32 - bits))
}

/**
 * Get number in binary format in bits range
 */
const getNumber = (value: number, bits: number) => {
  return truncateBits(value, bits)
}

/**
 * Get string in binary format in bits range.
 */
const getString = (value: string, bits: number) => {
  const split = value.split('');
  let result = 0;
  for (let i = 0; i < split.length; i++) {
    result |= split[i].charCodeAt(0) << (ASCII_BIT_SIZE * i)
  }
  return truncateBits(result, bits)
}

/**
 * Get boolean in binary format in bits range
 *
 * Use bits more than 1 for boolean is not optimal!
 */
const getBoolean =  (value: boolean, bits: number = 1) => {
  const number = +value

  return truncateBits(number, bits)
}

export const binaryFormat = {
  getNumber,
  getString,
  getBoolean,
}