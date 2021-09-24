import { GetOrganizationReposListParams, HTTPMethod } from "@store/RepoBranchesStore/types";
import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection
} from "@models/shared/collections";
import { normalizeRepoItem, RepoItemApi, RepoItemModel } from "@models/gitHub";
import { Meta } from "@utils/meta";
import ApiStore from "@shared/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { ENDPOINTS } from "@config/config";

type PrivateFields = "_list" | "_meta";

export default class ReposListStore implements ILocalStore {
  private _list: CollectionModel<number, RepoItemModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private readonly apiStore = new ApiStore<RepoItemApi[]>("https://api.github.com/");

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
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
    await this.apiStore.request({
      data: {},
      endpoint: ENDPOINTS.gitRepoListApi.create(params.organizationName),
      headers: {},
      method: HTTPMethod.GET
    });

    runInAction(() => {
      if (this.apiStore.success) {
        try {
          this._meta = Meta.success;
          this._list = normalizeCollection(this.apiStore.data.map((element) => {
            return normalizeRepoItem(element);
          }), (listItem) => listItem.id);
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
      this._meta = Meta.error;
    });
  }

  destroy(): void {

  }
}
