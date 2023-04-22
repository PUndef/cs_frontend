import { BinaryValue, createBitFactory } from "../../../1-lesson/1-task";
import { Data, Schema } from "../types";
import { _validate } from "../validator";
import { getSize, binaryFormat } from "./lib";

export const encode = (dataArg: Data, schemaArg: Schema): ArrayBuffer => {
  const data = [...dataArg];
  const schema = [...schemaArg];

  _validate(data, schema);

  const buffer = new ArrayBuffer(getSize(schema));
  const dataView = new Uint8Array(buffer);
  const bitFactory = createBitFactory(dataView);

  let encode = 0
  let byteOffset = 0
  for (let i = 0; i < data.length; i++) {
    const dataVal = data[i];
    const [schemaBits, schemaType] = schema[i]

    if (schemaType === 'number') {
      const binary = binaryFormat.getNumber(dataVal as number, schemaBits);
      encode |= binary << byteOffset
    }

    if (schemaType === 'boolean') {
      const binary = binaryFormat.getBoolean(dataVal as boolean, schemaBits);
      encode |= binary << byteOffset
    }

    if (schemaType === 'ascii') {
      const binary = binaryFormat.getString(dataVal as string, schemaBits);
      encode |= binary << byteOffset
    }

    byteOffset += schemaBits
  }

  const stringEncode = encode.toString(2).padStart(dataView.length * 8, '0');
  console.log("ENCODE stringEncode:", stringEncode, dataView.length, dataView);
  for (let i = stringEncode.length; i == 0; i--) {
    console.log('index', i);
    const byteIndex = Math.floor(i / 8);
    const bitIndex = i % 8;
    console.log('byteIndex', byteIndex);
    console.log('bitIndex', bitIndex);

    bitFactory.set(byteIndex, bitIndex, parseInt(stringEncode[i]) as BinaryValue);
  }

  return buffer;
}

const data = encode([2, 3], [[8, 'number'], [8, 'number']])
const dataView = new Uint8Array(data)
console.log(dataView[0]);
console.log('data', data);
console.log('DATA_VIEW 0:', dataView[0].toString(2).padStart(8, '0'));
console.log('DATA_VIEW 1:', dataView[1].toString(2).padStart(8, '0'));