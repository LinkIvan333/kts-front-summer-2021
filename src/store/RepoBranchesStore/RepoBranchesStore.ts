import ApiStore from "@shared/ApiStore";
import {
  GetOrganizationRepoBranchesParams,
  HTTPMethod,
} from "./types";
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
import { BranchItemModel, BranchItemApi, normalizeBranchItem } from "@models/gitHub/branchItem";


type PrivateFields = "_branches" | "_meta";

export default class RepoBranchesStore implements ILocalStore {
  private _branches: CollectionModel<string, BranchItemModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private readonly apiStore = new ApiStore("https://api.github.com/");

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branches: observable.ref,
      _meta: observable,
      branches: computed,
      meta: computed,
      getOrganizationRepoBranches: action
    });
  }

  get branches(): BranchItemModel[] {
    return linearizeCollection(this._branches);
  }

  get meta(): Meta {
    return this._meta;
  }


  async getOrganizationRepoBranches(params: GetOrganizationRepoBranchesParams): Promise<void> {
    this._meta = Meta.loading;
    this._branches = getInitialCollectionModel();
    const result = await this.apiStore.request<BranchItemApi[]>({
      data: {},
      endpoint: ENDPOINTS.gitBranchesApi.create(params.id),
      headers: {},
      method: HTTPMethod.GET
    });

    runInAction(() => {
      if (result.success) {
        try {
          this._meta = Meta.success;
          this._branches = normalizeCollection(result.data.map((element) => {
            return normalizeBranchItem(element);
          }), (listItem) => listItem.uuid);
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
