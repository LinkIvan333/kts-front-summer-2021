/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */
export enum HTTPMethod {
  GET,
  POST
}

export type GetOrganizationReposListParams = {
  organizationName: string;
}

export type GetOrganizationRepoBranchesParams = {
  id: string;
}

export type ApiResp<RepoItem> = {
  success: boolean;
  data: RepoItem;
  status: number
}

export type BranchItem = {
  name: string,
  uuid: string
}

export interface IGitHubStore {
  getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void>;
}
