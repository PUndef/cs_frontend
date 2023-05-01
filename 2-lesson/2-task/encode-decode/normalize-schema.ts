import { NormalizedSchema, Schema } from "../types";

export const normalizeSchema = (schema: Schema): NormalizedSchema => {
  return schema.flatMap(([size, type]) => {
    if (type === 'ascii') {
      const res: NormalizedSchema = new Array(size / 8)
      for (let i = 0; i < res.length; i++) {
        res[i] = {
          type,
          size: 8,
          partial: i > 0,
        }
      }
      return res
    }
    if (type === 'utf16') {
      const res: NormalizedSchema = new Array(size / 16)
      for (let i = 0; i < res.length; i++) {
        res[i] = {
          type,
          size: 16,
          partial: i > 0,
        }
      }
      return res
    }

    return {size, type, partial: false}
  })
}
