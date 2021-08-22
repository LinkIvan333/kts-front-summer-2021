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
        const date = await result.data;
        let array = [];
        for (let repo_info of date) {
            array.push({
                name: repo_info.name,
                owner: repo_info.owner.login,
                stars: repo_info.stargazers_count,
                updated: repo_info.pushed_at})
        }
        return {
            success: true,
            data: array
        }
    }
}
