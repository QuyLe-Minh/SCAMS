export function bitmapToBooleans(bitmap: number, length = 32): boolean[] {
  const result: boolean[] = [];
  for (let i = 0; i < length; i++) {
    result.push((bitmap & (1 << i)) !== 0);
  }
  return result;
}

export const getApiUrl = (path: string) => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      : "";
  return `${baseUrl}${path}`;
};
