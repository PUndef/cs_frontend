import { SupportedType } from "./types";

export const ASCII_BIT_SIZE = 8;

export const ERROR_MESSAGES = {
  LENGTH_IS_INCOMPATIBLE: 'Data length is incompatible with schema length!',
  TYPE_IS_INCOMPATIBLE: (
    el: string,
    type: SupportedType,
  ) => `Data element (${el}) type is incompatible with schema type ${type}!`,
  INVALID_NUMBER: 'Invalid number: only positive numbers and numbers that can be written in the required number of bits supported!',
  MAX_BITS: '32 bits is max',
  INDEX_OUT_OF_SCHEMA: 'Index out of schema!',
  ASCII_MULTIPLE_8_BITS: 'Bit value in schema must be a multiple of 8',
  ASCII_TOO_LONG_STRING: 'Too long string for encode',
}
