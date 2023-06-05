import { _validate } from ".";
import { ERROR_MESSAGES } from "../constants";
import { Schema } from "../types";

const DEFAULT_SCHEMA: Schema = [
  [3, 'number'],
  [2, 'number'],
  [1, 'boolean'],
  [1, 'boolean'],
  [16, 'ascii'],
];

const DEFAULT_DATA = [2, 3, true, false, 'ab']

describe('2 task - 2 lesson VALIDATOR', () => {
  test('validate data & schema length work correctly', () => {
    const schema: Schema = [...DEFAULT_SCHEMA];
    const data = [...DEFAULT_DATA].slice(0, 3); // Change data size

    const errorFn = () => _validate(data, schema);
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.LENGTH_IS_INCOMPATIBLE));
  });

  test('validate max bits work correctly', () => {
    const schema: Schema = [[40, 'number']];
    const data = [2]

    const errorFn = () => _validate(data, schema);
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.MAX_BITS));
  });

  test('validate data & schema type work correctly', () => {
    const schema: Schema = [...DEFAULT_SCHEMA];
    const data = [...DEFAULT_DATA];
    data[2] = 3; // Change boolean element to number

    const errorFn = () => _validate(data, schema);
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.TYPE_IS_INCOMPATIBLE('3', 'boolean')));
  });

  test('validate number work correctly', () => {
    const schema: Schema = [...DEFAULT_SCHEMA];
    const data = [...DEFAULT_DATA];
    data[0] = 300; // Change valid number to invalid

    const errorFn = () => _validate(data, schema);
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.INVALID_NUMBER));
  });

  test('validate ascii multiple of 8 work correctly', () => {
    const schema: Schema = [
      [3, 'number'],
      [2, 'number'],
      [1, 'boolean'],
      [1, 'boolean'],
      [15, 'ascii'],  // Change to not multiple of 8
    ];
    const data = [...DEFAULT_DATA];

    const errorFn = () => _validate(data, schema);
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.ASCII_MULTIPLE_8_BITS));
  });

  test('validate ascii too long string work correctly', () => {
    const schema: Schema = [...DEFAULT_SCHEMA];
    const data = [...DEFAULT_DATA];
    data[4] = 'very long string for 16 bit'; // Set long string for getting error

    const errorFn = () => _validate(data, schema);
    expect(errorFn).toThrow(new Error(ERROR_MESSAGES.ASCII_TOO_LONG_STRING));
  });
})