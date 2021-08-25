import ApiStore from "../../shared/store/ApiStore";
import {IGitHubStore, GetOrganizationReposListParams, RepoItem, HTTPMethod, ApiResp} from "./types";


export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com/");

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        const result = await this.apiStore.request({
            data: {},
            endpoint: `orgs/${params.organizationName}/repos`,
            headers: {},
            method: HTTPMethod.GET
        });

        const date = result.data;
        if (!result.success) {
            return {
                success: false,
                data: date,
                status: result.status
            }
        }

        const array = [];
        for (let repo_info of date) {
            array.push({
                name: repo_info.name,
                owner: repo_info.owner.login,
                stars: repo_info.stargazers_count,
                updated: repo_info.pushed_at
            })
        }
        return {
            success: true,
            data: array,
            status: result.status
        }
    }
}
