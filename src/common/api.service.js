import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        // Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader() {},

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(resource, pk = "") {
        console.log(API_URL+'/'+resource+'/'+pk)
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
    }
};

export default ApiService;

const CONCERT_PATH = 'concerts'

export const ConcertsService = {
    query(params) {
        return ApiService.query(CONCERT_PATH, {
            params: params
        });
    },
    get(pk) {
        console.log(pk)
        return ApiService.get(CONCERT_PATH, pk);
    },
    create(params) {
        return ApiService.post(CONCERT_PATH, { concert: params });
    },
    update(pk, params) {
        return ApiService.update(CONCERT_PATH, pk, { concert: params });
    },
    destroy(pk) {
        return ApiService.delete(CONCERT_PATH+`/${pk}`);
    }
};