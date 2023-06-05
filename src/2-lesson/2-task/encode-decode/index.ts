import { Data, NormalizedSchema, Schema } from "../types";
import { _validate } from "../validator";
import { createMask, getUintArray, getViewMaxSize } from "./lib";
import { normalizeSchema } from "./normalize-schema";

const getOffsets = (normalizedSchema: NormalizedSchema) => {
  const size = getViewMaxSize(normalizedSchema)
  const offsets = []

  loop: for (let i = 0, index = 0; i < normalizedSchema.length; index++) {
    let offset = 0

    while (offset + normalizedSchema[i].size <= size) {
      const cur = normalizedSchema[i]
      offsets.push({...cur, offset, index})
      offset += cur.size;
      i++;
      if (i === normalizedSchema.length) {
        break loop;
      }
    }
  }

  return offsets;
}

function* dataIterator(data: Data) {
  for (const el of data) {
    if (typeof el === 'string') {
      yield* el;
    } else {
      yield el;
    }
  }
}

export const encode = (dataArg: Data, schemaArg: Schema) => {
  const data = [...dataArg]
  const schema = [...schemaArg]
  _validate(data, schema)

  const normalizedSchema = normalizeSchema(schema)
  const size = getViewMaxSize(normalizedSchema)
  const offsets = getOffsets(normalizedSchema)

  const UintArray = getUintArray(size)
  const buffer = new UintArray((offsets.at(-1)?.index || 0) + 1)
  const iter = dataIterator(data);
  offsets.forEach(({size, offset, index, type}) => {
    const {value, done} = iter.next();

    if (done) {
      throw new TypeError('Schema mismatch')
    }

    const isString = type === 'ascii' || type === 'utf16'
    const bytes = isString ? (value as string).charCodeAt(0) : value
    buffer[index] |= ((bytes as any) & createMask(size)) << offset;
  });

  return buffer
}

export const decode = (buffer: ArrayBuffer, schemaArg: Schema) => {
  const schema = [...schemaArg];
  const normalizedSchema = normalizeSchema(schema)
  const offsets = getOffsets(normalizedSchema)

  const res: Data = []
  offsets.forEach(({size, offset, index, type, partial}) => {
    // TODO fix ts-ignore
    // @ts-ignore
    const bytes = (buffer[index] & createMask(size, offset)) >> offset;
    switch (type) {
      case 'number':
        res.push(bytes);
        break
      case 'boolean':
        res.push(bytes > 0);
        break
      case 'ascii':
        const char = String.fromCharCode(bytes)
        if (partial) {
          res[res.length - 1] += char
        } else {
          res.push(char);
        }
        break
      case 'utf16':
        const char16 = String.fromCharCode(bytes)
        if (partial) {
          res[res.length - 1] += char16
        } else {
          res.push(char16);
        }
        break
    }
  });

  return res;
}


const DATA = [2, 3, true, false, 'ab', 12, 'ab']
const DEFAULT_SCHEMA: Schema = [
  [3, 'number'],
  [2, 'number'],
  [1, 'boolean'],
  [1, 'boolean'],
  [16, 'ascii'],
  [16, 'number'],
  [32, 'utf16'],
];

// console.log(decode(encode(DATA, DEFAULT_SCHEMA), DEFAULT_SCHEMA));