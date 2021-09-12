import ApiStore from "@shared/ApiStore";
import {
  IGitHubStore,
  GetOrganizationReposListParams,
  GetOrganizationRepoBranchesParams,
  RepoItem,
  HTTPMethod,
  ApiResp,
  BranchItem
} from "./types";
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com/");

  async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
    const result = await this.apiStore.request({
      data: {},
      endpoint: `orgs/${params.organizationName}/repos`,
      headers: {},
      method: HTTPMethod.GET
    });

    const data = result.data;
    if (!result.success) {
      return {
        success: false,
        data: data,
        status: result.status
      };
    }

    return {
      success: true,
      data: data.map((repoInfo: any) => {
        return {
          id: repoInfo.id,
          avatarUrl: repoInfo.owner.avatar_url,
          name: repoInfo.name,
          owner: repoInfo.owner.login,
          stars: repoInfo.stargazers_count,
          updated: `Updated ${dayjs(repoInfo.pushed_at).format("DD MMM")}`
        }
      }),
      status: result.status
    };
  }

  async getOrganizationRepoBranches(params: GetOrganizationRepoBranchesParams): Promise<ApiResp<BranchItem[]>> {
    const result = await this.apiStore.request({
      data: {},
      endpoint: `repositories/${params.id}/branches`,
      headers: {},
      method: HTTPMethod.GET
    });

    const data = result.data;
    if (!result.success) {
      return {
        success: false,
        data: data,
        status: result.status
      };
    }

    return {
      success: true,
      data: data.map((repoInfo: BranchItem) => {
        return {
          name: repoInfo.name,
          uuid: uuidv4()
        }
      }),
      status: result.status
    };
  }
  //   const result = await this.apiStore.request({
  //     data: {},
  //     endpoint: `repos/${params.organizationName}/${params.repoName}/branches`,
  //     headers: {},
  //     method: HTTPMethod.GET
  //   });
  //
  //   const data = result.data;
  //   if (!result.success) {
  //     return {
  //       success: false,
  //       data: data,
  //       status: result.status
  //     };
  //   }
  //
  //   return {
  //     success: true,
  //     data: data.map((repoInfo: BranchItem) => {
  //       return {
  //         name: repoInfo.name,
  //         uuid: uuidv4()
  //       }
  //     }),
  //     status: result.status
  //   };
  // }
}
