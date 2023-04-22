import { encode } from ".";
import { getSchemaIndex, getSize, binaryFormat } from "./lib";
import { Schema} from "../types";

const DEFAULT_SCHEMA: Schema = [
  [3, 'number'],
  [2, 'number'],
  [1, 'boolean'],
  [1, 'boolean'],
  [16, 'ascii'],
];

const CUSTOM_SCHEMA: Schema = [
  [2, 'number'],
  [1, 'boolean'],
  [3, 'number'],
  [1, 'boolean'],
];

describe('2 task - 2 lesson ENCODE', () => {
  test('getSize work correctly', () => {
    expect(getSize(DEFAULT_SCHEMA)).toBe(3);
    expect(getSize(CUSTOM_SCHEMA)).toBe(1);
  });

  test('getSchemaIndex work correctly', () => {
    // [3, '.'], [2, '.'], [1, '.'], [1, '.'], [16, '.'],
    expect(getSchemaIndex(0, DEFAULT_SCHEMA)).toBe(0); // 0
    expect(getSchemaIndex(1, DEFAULT_SCHEMA)).toBe(3); // 0 + 3
    expect(getSchemaIndex(2, DEFAULT_SCHEMA)).toBe(5); // 0 + 3 + 2
    expect(getSchemaIndex(3, DEFAULT_SCHEMA)).toBe(6); // 0 + 3 + 2 + 1
    expect(getSchemaIndex(4, DEFAULT_SCHEMA)).toBe(7); // 0 + 3 + 2 + 1 + 1

    // [2, '.'], [1, '.'], [3, '.'], [1, '.'],
    expect(getSchemaIndex(0, CUSTOM_SCHEMA)).toBe(0); // 0
    expect(getSchemaIndex(1, CUSTOM_SCHEMA)).toBe(2); // 0 + 2
    expect(getSchemaIndex(2, CUSTOM_SCHEMA)).toBe(3); // 0 + 2 + 1
    expect(getSchemaIndex(3, CUSTOM_SCHEMA)).toBe(6); // 0 + 2 + 1 + 3
  });

  test('getNumber work correctly', () => {
    expect(binaryFormat.getNumber(3, 2)).toBe(0b11);
    expect(binaryFormat.getNumber(3, 3)).toBe(0b011);
    expect(binaryFormat.getNumber(7, 3)).toBe(0b111);
    expect(binaryFormat.getNumber(9, 3)).toBe(0b001); // Overflow 3 bits (1001 -> 001)
    expect(binaryFormat.getNumber(2, 8)).toBe(0b00000010);
    expect(binaryFormat.getNumber(3, 8)).toBe(0b00000011);
    expect(binaryFormat.getNumber(2, 9)).toBe(0b000000010);
  });

  test('getBoolean work correctly', () => {
    expect(binaryFormat.getBoolean(false)).toBe(0b0);
    expect(binaryFormat.getBoolean(true)).toBe(0b1);
    expect(binaryFormat.getBoolean(false, 2)).toBe(0b00);
    expect(binaryFormat.getBoolean(true, 2)).toBe(0b01);
  });

  test('getString work correctly', () => {
    expect(
      binaryFormat.getString('a', 8)
    ).toBe(0b01100001); // a - 01100001;
    expect(
      binaryFormat.getString('ab', 16)
    ).toBe(0b0110001001100001); //  b - 01100010; a - 01100001;
    expect(
      binaryFormat.getString('abс', 24)
    ).toBe(0b010000010110001001100001); // с- (OVERFLOW: 100)0100 0001; b - 0110 0010; a - 0110 0001;
    expect(
      binaryFormat.getString('abс', 8)
    ).toBe(0b01100001); // (OVERFLOW: с- 10001000001; b - 01100010;) a - 01100001;
  });

  test('encode 1 case work correctly', () => {
    const data = encode([2, 3], [[8, 'number'], [8, 'number']])
    const dataView = new Uint8Array(data)
    console.log('DATA_VIEW 0:', dataView[0].toString(2).padStart(8, '0'));
    console.log('DATA_VIEW 1:', dataView[1].toString(2).padStart(8, '0'));
    expect(dataView[0]).toBe(0b00000011) // 3
    expect(dataView[1]).toBe(0b00000010) // 2
  })

  test('encode 2 case work correctly', () => {
    const data = encode([2, 3], [[9, 'number'], [8, 'number']])
    const dataView = new Uint8Array(data)
    console.log('DATA_VIEW 0:', dataView[0].toString(2).padStart(8, '0'));
    console.log('DATA_VIEW 1:', dataView[1].toString(2).padStart(8, '0'));
    // How it works:
    // 9 bit for 2 = 0 0000 0010
    // 8 bit for 3 = 0000 0110
    // it's create 3 Uint8Array
    // 0000 0000 0000 011 0 0000 0010
    expect(dataView[0]).toBe(0b00000001) // first 8 bit of 2
    expect(dataView[1]).toBe(0b00000011) // 1 bit from 2 & 7 bit from 3
    expect(dataView[2]).toBe(0b00000000) // 1 bit from 3 & zeros for filling Uint8Array
  })

  // test("encode method work correctly", () => {
  //   const schema: Schema = [
  //     [3, 'number'],
  //     [2, 'number'],
  //     [1, 'boolean'],
  //     [1, 'boolean'],
  //     [16, 'ascii'],
  //   ];

  //   const data = encode(
  //     [ 2 /**     */,  3 /**     */,  true /**   */, false /**   */, 'ab'],
  //     [[3, 'number'], [2, 'number'], [1, 'boolean'], [1, 'boolean'], [16, 'ascii']],
  //     //010            11             1               0               01100010(b)01100001(a)
  //   )
  //   const dataView = new Uint8Array(data)
  //   console.log('dataView', dataView);
  //                              10001100
  //   expect(dataView[0]).toBe(0b10000110)
  //   expect(dataView[1]).toBe(0b01000110)
  //   expect(dataView[2]).toBe(0b01110100)
  //   //                           10111
  //   // encode([  2   3  true  false  'ab']
  //   // binary 0b 010 11 1     0       0000000001100001
  // });
})