import {ApiResponse, IApiStore, RequestParams, HTTPMethod, StatusHTTP} from "./types";

const qs = require("qs");

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string = "") {
        this.baseUrl = baseUrl;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            const headers = {...params.headers};
            headers["Content-type"] = "application/json; charset=utf-8";

            const response = await fetch(`${this.baseUrl}${params.endpoint}${(params.method === HTTPMethod.GET ? qs.stringify(params.data, {addQueryPrefix: true}) : "")}`,
                (params.method === HTTPMethod.GET ? {
                    method: "GET",
                    headers: params.headers
                } : {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(params.data)
                }));

            if (response.ok) {
                return {
                    success: true,
                    data: await response.json(),
                    status: response.status
                };
            }
            return {
                success: false,
                data: await response.json(),
                status: response.status
            };
        } catch (e) {
            return {
                success: false,
                data: e,
                status: StatusHTTP.UNEXPECTED_ERROR
            }
        }
    }
}