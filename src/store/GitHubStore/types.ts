/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type RepoItem = {
    name: string,
    owner: string,
    stars: number,
    updated: string
}

export type ApiResp<RepoItem> = {
    success: true;
    data: RepoItem;
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>>;

    // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
   // postSomeData(params: PostSomeDataParams): Promise<ApiResp<PostSomeDataResp>>;
}
