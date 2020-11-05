import TokenService from "@/common/token.service";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
        this.setHeader();
    },

    setHeader() {
        Vue.axios.defaults.headers.common[
            "X-AUTH-TOKEN"
            ] = `${TokenService.getToken()}`;
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(resource, pk = "") {
        return Vue.axios.get(`${resource}/${pk}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },

    update(resource, pk, params) {
        return Vue.axios.post(`${resource}/${pk}`, params);
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    upload(resource, formData){
        return Vue.axios.post(`${resource}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default ApiService;

const CONCERT_PATH = 'concerts'
const FILE_PATH = 'files'

export const ConcertsService = {
    query(params) {
        return ApiService.query(CONCERT_PATH, {
            params: params
        });
    },
    get(pk) {
        return ApiService.get(CONCERT_PATH, pk);
    },
    create(params) {
        return ApiService.post(CONCERT_PATH, params);
    },
    update(pk, params) {
        return ApiService.update(CONCERT_PATH, pk, params);
    },
    destroy(pk) {
        return ApiService.delete(CONCERT_PATH+`/${pk}`);
    },
    upload(file){
        const formData = new FormData()
        formData.append('file', file)
        return ApiService.upload(FILE_PATH, formData);
    }
};