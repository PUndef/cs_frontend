export const getType = (value: unknown) => {
  return typeof value === 'string' ? 'ascii' : typeof value;
}

export const validateNumber = (value: number, bitQty: number): boolean => {
  const maxValue = 2 ** bitQty - 1;
  // Only positive numbers and numbers that can be written in the required number of bits
  return value > 0 && value <= maxValue;
}
