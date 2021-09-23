export type gitHubOwnerApi = {
  id: number,
  avatar_url: string,
  login: string,
  url: string
};

export type gitHubOwnerModel = {
  id: number,
  avatarUrl: string,
  login: string,
  url: string
};

export const normalizeGitHubOwner = (from: gitHubOwnerApi): gitHubOwnerModel => ({
  id: from.id,
  avatarUrl: from.avatar_url,
  login: from.login,
  url: from.url
});