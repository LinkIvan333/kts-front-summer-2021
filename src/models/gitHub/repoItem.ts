import { gitHubOwnerApi, gitHubOwnerModel, normalizeGitHubOwner } from "./gitHubOwner"
import dayjs from "dayjs";

export type RepoItemApi = {
  id: number,
  name: string,
  owner: gitHubOwnerApi,
  stargazers_count: number,
  updated_at: string
};

export type RepoItemModel = {
  id: number,
  name: string,
  owner: gitHubOwnerModel,
  stars: number,
  updated: string
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  owner: normalizeGitHubOwner(from.owner),
  stars: from.stargazers_count,
  updated: `Updated ${dayjs(from.updated_at).format("DD MMM")}`
});