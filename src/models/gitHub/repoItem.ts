export type RepoItemApi = {
  id: number,
  avatar_url: string,
  name: string,
  owner: string,
  stars: number,
  updated: string
};

export type RepoItemModel = {
  id: number,
  avatarUrl: string,
  name: string,
  owner: string,
  stars: number,
  updated: string
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  avatarUrl: from.avatar_url,
  name: from.name,
  owner: from.owner,
  stars: from.stars,
  updated: from.updated
});