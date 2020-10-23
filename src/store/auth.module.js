import ApiService from "@/common/api.service";
import TokenService from "@/common/token.service";

import {
    LOGIN,
    LOGOUT,
    REGISTER,
   /*CHECK_AUTH,
    UPDATE_USER*/
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!TokenService.getToken()
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise(resolve => {
            ApiService.post("/signin", credentials )
                .then(({ data }) => {
                    context.commit(SET_AUTH, { "token": data });
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [REGISTER](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("/signup", credentials )
                .then(({ data }) => {
                    console.log(data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    /*[CHECK_AUTH](context) {
        if (TokenService.getToken()) {
            ApiService.setHeader();
            ApiService.get("user")
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    },
    [UPDATE_USER](context, payload) {
        const { email, username, password, image, bio } = payload;
        const user = {
            email,
            username,
            bio,
            image
        };
        if (password) {
            user.password = password;
        }

        return ApiService.put("user", user).then(({ data }) => {
            context.commit(SET_AUTH, data.user);
            return data;
        });
    }*/
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        console.log(user);
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        TokenService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        TokenService.destroyToken();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
