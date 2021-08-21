import ApiStore from '../../shared/store/ApiStore';
import {IGitHubStore, GetOrganizationReposListParams, ApiResp, RepoItem} from "./types";


export default class GitHubStore implements IGitHubStore {
    private readonly ApiStore = new ApiStore(`https://api.github.com/`);
    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        const result = await this.ApiStore.request<{}>({
            data: {},
            endpoint: `orgs/${params.organizationName}/repos`,
            headers: {},
            method: 0
        })
        const data = await result.data;
        return {
            success: true,
            data: data
        }
    }
}
