import ApiStore from "../../shared/store/ApiStore";
import {
  IGitHubStore,
  GetOrganizationReposListParams,
  GetOrganizationRepoBranchesParams,
  RepoItem,
  HTTPMethod,
  ApiResp,
  BranchItem
} from "./types";

var dayjs = require("dayjs");

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
      };
    }

    const array = [];
    for (let repo_info of date) {
      array.push({
        id: repo_info.id,
        avatar_url: repo_info.owner.avatar_url,
        name: repo_info.name,
        owner: repo_info.owner.login,
        stars: repo_info.stargazers_count,
        updated: `Updated ${dayjs(repo_info.pushed_at).format("DD MMM")}`
      });
    }
    return {
      success: true,
      data: array,
      status: result.status
    };
  }

  async getOrganizationRepoBranches(params: GetOrganizationRepoBranchesParams): Promise<ApiResp<BranchItem[]>> {
    const result = await this.apiStore.request({
      data: {},
      endpoint: `repos/${params.organizationName}/${params.repoName}/branches`,
      headers: {},
      method: HTTPMethod.GET
    });

    const date = result.data;
    if (!result.success) {
      return {
        success: false,
        data: date,
        status: result.status
      };
    }
    const array = [];
    for (let repo_info of date) {
      array.push({
        name: repo_info.name
      });
    }
    return {
      success: true,
      data: array,
      status: result.status
    };
  }
}
