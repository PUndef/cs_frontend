// For string support only ASCII format!
export type SupportedType = 'number' | 'boolean' | 'ascii' | 'utf16' | 'u16';
export type Schema = [number, SupportedType][];
export type Data = (number | string | boolean)[]

export type UintArraySize = 8 | 16 | 32

export type NormalizedSchema = {
  size: number,
  type: SupportedType,
  partial: boolean;
}[]
