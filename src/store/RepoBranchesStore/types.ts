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
