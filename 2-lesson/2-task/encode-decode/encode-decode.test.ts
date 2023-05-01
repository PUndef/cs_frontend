import { encode, decode } from ".";
import { Schema} from "../types";

const DEFAULT_SCHEMA: Schema = [
  [3, 'number'],
  [2, 'number'],
  [1, 'boolean'],
  [1, 'boolean'],
  [16, 'ascii'],
  [16, 'number'],
  [32, 'utf16'],
];

describe('2 task - 2 lesson ENCODE', () => {
  test('encode-decode work correctly', () => {
    const DATA = [2, 3, true, false, 'ab', 12, 'ab']
    expect(JSON.stringify(decode(encode(DATA, DEFAULT_SCHEMA), DEFAULT_SCHEMA))).toBe(JSON.stringify(DATA))
  })
})