import { normalizeSchema } from "../../2-lesson/2-task/encode-decode/normalize-schema";
import { NormalizedSchema } from "../../2-lesson/2-task/types";

type SupportedEncodeKey = 'utf16' | 'u16'
export type Schema = [string, SupportedEncodeKey, number?][]

// Какое кол-во символов выделять по дефолту, если значение не указано
const DEFAULT_MAX = 1;

// Schema example
// [
//   ['name', 'utf16', 10], // Число - это максимальное количество символов
//   ['lastName', 'utf16', 10],
//   ['age', 'u16'] // uint16
// ]

// Normalized schema
// [
//    160 because every char need 16 bit for encode
//    {type: 'utf16', size: 160, partial: true, key: 'name'}
//    ...
//    {type: 'utf16', size: 160, partial: true, key: 'lastName'}
//    ...
//    {type:   'u16', size: 16, partial: true, key: 'age'}
//    ...
// ]

const normalizeStructure = (schema: Schema) => {
  // [number, SupportedType][];
  return normalizeSchema(schema.map(([_, type, symbols]) => [(symbols || 1) * 16, type]));
  // return schema.flatMap(([key, type, max]) => {
  //   let size = (max || DEFAULT_MAX) * 8
  //   if (type === 'utf16' || type === 'u16') {
  //     let size = (max || DEFAULT_MAX) * 16
  //     const res = new Array(size / 8).fill({key, size, type, partial: true})
  //     return res
  //   }

  //   return {size, type, partial: false}
  // })
}

export class Structure {
  _schema: NormalizedSchema = []

  constructor(schema: Schema) {
    this._schema = normalizeStructure(schema);
    const normalizedSchema = normalizeStructure(schema);
    // console.log('normalizedSchema', normalizedSchema);

  }

  get(key: string) {

  }

  set(key: string, value: string | number | boolean) {

  }
}

const schema: Schema = [
  ['name', 'utf16', 10], // Число - это максимальное количество символов
  ['lastName', 'utf16', 10],
  ['age', 'u16'] // uint16
]

const jackBlack = new Structure(schema);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);

// console.log(jackBlack.get('name')); // 'Jack'