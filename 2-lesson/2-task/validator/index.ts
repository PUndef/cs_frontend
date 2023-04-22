import { ERROR_MESSAGES } from "../constants";
import { Data, Schema } from "../types";
import { getType, validateNumber } from "./lib";

export const _validate = (data: Data, schema: Schema) => {
  if (data.length !== schema.length) {
    throw new Error(ERROR_MESSAGES.LENGTH_IS_INCOMPATIBLE)
  }

  for (let i = 0; i < schema.length; i++) {
    const [schemaBits, schemaType] = schema[i]
    const dataValue = data[i];
    const dataType = getType(dataValue);

    if (schemaBits > 32) {
      throw new Error(ERROR_MESSAGES.MAX_BITS);
    }

    if (schemaType !== dataType) {
      throw new Error(ERROR_MESSAGES.TYPE_IS_INCOMPATIBLE(`${dataValue}`, schemaType));
    }

    if (dataType === 'number' && !validateNumber(dataValue as number, schemaBits)) {
      throw new Error(ERROR_MESSAGES.INVALID_NUMBER)
    }

    if (dataType === 'ascii') {
      const multipleOf8Bits = schemaBits % 8 === 0
      if (!multipleOf8Bits) {
        throw new Error(ERROR_MESSAGES.ASCII_MULTIPLE_8_BITS)
      }

      const tooLongString = (dataValue as string).length * 8 > schemaBits
      if (tooLongString) {
        throw new Error(ERROR_MESSAGES.ASCII_TOO_LONG_STRING)
      }
    }
  }
}
