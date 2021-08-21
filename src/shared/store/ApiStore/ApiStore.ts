import {ApiResponse, IApiStore, RequestParams} from "./types";

export default class ApiStore implements IApiStore {
    readonly baseUrl : string;

    constructor(url : string) {
        this.baseUrl = url;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        const qs = require('qs');
        let response : any;
        if (params.method === 0) {
            response = await fetch(this.baseUrl + params.endpoint + qs.stringify(params.data, {addQueryPrefix: true}));
        } else {
            response = await fetch(params.endpoint, {
                method: 'POST',
                headers: params.headers,
                body: JSON.stringify(params.data)
            });
        }
        const data = await response.json()
        if (response.ok) {
            return {
                success: true,
                data: data as SuccessT,
                status: response.status
            }
        } else {
            return {
                success: false,
                data: data as ErrorT,
                status: response.status
            }
        }
    }
}















