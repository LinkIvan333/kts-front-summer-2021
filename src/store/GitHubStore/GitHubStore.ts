import ApiStore from "@shared/ApiStore";
import {
  IGitHubStore,
  GetOrganizationReposListParams,
  GetOrganizationRepoBranchesParams,
  HTTPMethod,
  ApiResp,
  BranchItem
} from "./types";
import { normalizeRepoItem, RepoItemApi, RepoItemModel } from "@models/gitHub";
import { v4 as uuidv4 } from "uuid";
import { ENDPOINTS } from "@config/config";
import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection
} from "@models/shared/collections";
import dayjs from "dayjs";

type PrivateFields = "_list" | "_meta";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private _list: CollectionModel<number, RepoItemModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private readonly apiStore = new ApiStore("https://api.github.com/");

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      getOrganizationReposList: action,
      list: computed,
      meta: computed
    });
  }

  get list(): RepoItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    const result = await this.apiStore.request({
      data: {},
      endpoint: ENDPOINTS.gitRepoListApi.create(params.organizationName),
      headers: {},
      method: HTTPMethod.GET
    });

    runInAction(() => {
      const data = result.data;
      if (result.success) {
        try {
          this._meta = Meta.success;
          const list: RepoItemModel[] = [];
          data.forEach((element: any) => {
            let local: RepoItemApi = {
              id: element.id,
              avatar_url: element.owner.avatar_url,
              name: element.name,
              owner: element.owner.login,
              stars: element.stargazers_count,
              updated: `Updated ${dayjs(element.pushed_at).format("DD MMM")}`
            };
            list.push(normalizeRepoItem(local));
          });
          this._list = normalizeCollection(list, (listItem) => listItem.id);
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
      this._meta = Meta.error;
    });
  }

  async getOrganizationRepoBranches(params: GetOrganizationRepoBranchesParams): Promise<ApiResp<BranchItem[]>> {
    const result = await this.apiStore.request({
      data: {},
      endpoint: ENDPOINTS.gitBranchesApi.create(params.id),
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
        };
      }),
      status: result.status
    };
  }

  destroy(): void {

  }

}
