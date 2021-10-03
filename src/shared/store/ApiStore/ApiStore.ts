import { RequestParams, HTTPMethod, StatusHTTP, ApiResponse } from "./types";
import * as qs from "qs";
import { ILocalStore } from "utils/useLocalStore/useLocalStore";
import { action, makeObservable } from "mobx";


export default class ApiStore<SuccessT, ErrorT = any> implements ILocalStore {
  readonly baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
    makeObservable<ApiStore<SuccessT, ErrorT>>(this, {
      request: action
    });
  }

  async request<ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
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

      return {
        success: response.ok,
        data: await response.json(),
        status: response.status
      };

    } catch (e) {
      return {
        success: false,
        data: e as ErrorT,
        status: StatusHTTP.UNEXPECTED_ERROR
      };
    }
  }

  destroy(): void {

  }
}