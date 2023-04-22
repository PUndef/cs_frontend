// For string support only ASCII format!
export type SupportedType = 'number' | 'boolean' | 'ascii';
export type Schema = [number, SupportedType][];
export type Data = (number | string | boolean)[]
