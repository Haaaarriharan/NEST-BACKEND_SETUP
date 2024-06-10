export async function NumberFloatConversion(
  value: string | number,
  type?: string,
): Promise<number> {
  let result: number

  if (typeof value === 'string') {
    result = parseFloat(value)
  } else {
    result = value as number
  }
  if (type === 'pieceWeight') {
    return parseFloat(result.toFixed(4))
  } else {
    return parseFloat(result.toFixed(2))
  }
}
