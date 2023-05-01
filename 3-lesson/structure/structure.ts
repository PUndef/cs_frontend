type SupportedEncodeKey = 'utf16' | 'u16'
export type Schema = [string, SupportedEncodeKey, number?][]

// Какое кол-во символов выделять по дефолту, если значение не указано
const DEFAULT_MAX = 1;

export type NormalizedSchema = {
  key: string;
  size: number;
  type: string;
  partial: boolean;
}[]

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

const normalizeSchema = (schema: Schema) => {
  return schema.flatMap(([key, type, max]) => {
    let size = (max || DEFAULT_MAX) * 8
    if (type === 'utf16' || type === 'u16') {
      let size = (max || DEFAULT_MAX) * 16
      const res = new Array(size / 8).fill({key, size, type, partial: true})
      return res
    }

    return {size, type, partial: false}
  })
}

export class Structure {
  _schema: Schema = []

  constructor(schema: Schema) {
    this._schema = schema;
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

const normalizedSchema = normalizeSchema(schema)
console.log('normalizedSchema', normalizedSchema);

const jackBlack = new Structure(schema);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);

console.log(jackBlack.get('name')); // 'Jack'