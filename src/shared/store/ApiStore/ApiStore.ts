import { RequestParams, HTTPMethod, StatusHTTP } from "./types";
import * as qs from "qs";
import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

type PrivateFields = "_success" | "_data" | "_status";

export default class ApiStore<SuccessT, ErrorT = any> implements ILocalStore {
  readonly baseUrl: string;
  private _success: boolean = false;
  private _data: SuccessT = {} as SuccessT;
  private _status: StatusHTTP | number = StatusHTTP.UNEXPECTED_ERROR;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
    makeObservable<ApiStore<SuccessT, ErrorT>, PrivateFields>(this, {
      _success: observable.ref,
      _data: observable,
      _status: observable,
      success: computed,
      data: computed,
      status: computed,
      request: action
    });
  }

  get success(): boolean {
    return this._success;
  }

  get data(): SuccessT {
    return this._data;
  }

  get status(): StatusHTTP | number {
    return this._status;
  }

  async request<ReqT = {}>(params: RequestParams<ReqT>): Promise<void> {
    try {
      const headers = { ...params.headers };
      headers["Content-type"] = "application/json; charset=utf-8";

      const response = await fetch(`${this.baseUrl}${params.endpoint}${(params.method === HTTPMethod.GET ? qs.stringify(params.data, { addQueryPrefix: true }) : "")}`,
        (params.method === HTTPMethod.GET ? {
          method: "GET",
          headers: params.headers
        } : {
          method: "POST",
          headers: headers,
          body: JSON.stringify(params.data)
        }));

      await runInAction(async () => {
        if (response.ok) {
          this._success = true;
          this._data = await response.json();
          this._status = response.status;
        } else {
          this._success = false;
          this._data = await response.json();
          this._status = response.status;
        }
      });

    } catch (e) {
      runInAction(() => {
        this._success = false;
        this._data = e;
        this._status = StatusHTTP.UNEXPECTED_ERROR;
      });
    }
  }

  destroy(): void {

  }
}