export function doubleAndNext(arr: number[]): number[] {
  return arr.reduce((result, num) => {
    result.push(num * 2, num * 2 + 1)
    return result
  }, [] as number[])
}
