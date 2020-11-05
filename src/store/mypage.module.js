import ApiService from "@/common/api.service";

import {
    MY_CONCERTS
} from "./actions.type";

import {
    SET_ERROR,
    SET_MY_CONCERTS
} from "./mutations.type";

const state = {
    errors: null,
    concert: {
        title: "",
        performer: "",
        startDate: "",
        endDate: "",
        runningTime: "",
        description: "",
        currentAudience: 0,
        maxAudience: '0',
        price: 0,
        likesCount: 0,
        status: "UPCOMING",
        img: "",
        time: 0
    },
    concerts: [],
    reservations: []
};

const getters = {
    myConcerts(state){
        return state.concerts;
    },
    myReservations(state){
        return state.reservations;
    }
};

const actions = {
    [MY_CONCERTS](context){
        ApiService.get("/my-page")
            .then(({ data }) => {
                context.commit(SET_MY_CONCERTS, data);
                console.log("MY CONCERTS");
                console.log(data);
            })
            .catch(() => {
                context.commit(SET_ERROR);
            });
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_MY_CONCERTS](state, concert){
        state.concerts = concert[0];
        state.reservations = concert[1];
        console.log("state");
        console.log(state.concerts);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
