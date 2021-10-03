import { v4 as uuidv4 } from "uuid";

export type BranchItemApi = {
  name: string,
}

export type BranchItemModel = {
  name: string,
  uuid: string
}

export const normalizeBranchItem = (from: BranchItemApi): BranchItemModel => ({
  name: from.name,
  uuid: uuidv4()
})
