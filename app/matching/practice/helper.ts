import { TermItem } from "@/app/map/constants"

const termItemToRecord = (termItems: TermItem[]) => {
  const termRecord: Record<string, string> = {}

  termItems.forEach(termItem => {
    termRecord[termItem.term] = termItem.definition
  })

  return termRecord
}

export default termItemToRecord
