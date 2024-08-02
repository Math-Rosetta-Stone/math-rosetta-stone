import { TermItem } from "@/app/map/constants"
export function doubleAndNext(arr: number[]): number[] {
  return arr.reduce((result, num) => {
    result.push(num * 2, num * 2 + 1)
    return result
  }, [] as number[])
}

export function termItemToRecord(termItems: TermItem[]) {
  const termRecord: Record<string, string> = {}

  termItems.forEach(termItem => {
    termRecord[termItem.term] = termItem.definition
  })

  return termRecord
}
