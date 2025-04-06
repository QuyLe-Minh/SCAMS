export function bitmapToBooleans(bitmap: number, length = 32): boolean[] {
    const result: boolean[] = [];
    for (let i = 0; i < length; i++) {
      result.push((bitmap & (1 << i)) !== 0);
    }
    return result;
  }