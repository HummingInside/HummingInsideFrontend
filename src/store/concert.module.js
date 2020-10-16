import Vue from 'vue';
import {ConcertsService} from "@/common/api.service";

import {
    CONCERT_PUBLISH,
    CONCERT_DELETE,
    FETCH_CONCERT,
    FETCH_CONCERTS
} from "@/store/actions.type";

import {
    FETCH_START,
    FETCH_END,
    SET_CONCERT,
    RESET_STATE
} from './mutations.type'

const initialState = {
    concert: {
        title: "",
        performer: "",
        date: "",
        description: "",
        currentAudience: 0,
        maxAudience: '0',
        price: 0,
        likesCount: 0,
        status: "",
        img: "",
        time: 0
    },
    concerts: [],
    concertsCount: 0,
    isLoading: true
}

const getters = {
    concert(state){
        return state.concert;
    },
    concerts(state){
        return state.concerts;
    },
    concertsCount(state) {
        return state.concertsCount;
    },
    isLoading(state) {
        return state.isLoading;
    }
}

export const state = { ...initialState};

export const actions = {
    async [FETCH_CONCERT](context, concertPk, prevConcert){
        // avoid extronuous network call if article exists
        if(prevConcert !== undefined){
            return context.commit(SET_CONCERT, prevConcert)
        }
        const { data } = await ConcertsService.get(concertPk)
        context.commit(SET_CONCERT, data)
        return data
    },
    [FETCH_CONCERTS]({ commit }, params){
        commit(FETCH_START);
        return ConcertsService.query(params.type, params.filters)
            .then(({ data }) => {
                commit(FETCH_END, data)
            })
            .catch(error => {
                throw new Error(error)
            })
    },
    [CONCERT_PUBLISH]({ state }){
        return ConcertsService.create(state.concert)
    },
    [CONCERT_DELETE](context, pk){
        return ConcertsService.destroy(pk)
    }
}

export const mutations = {
    [SET_CONCERT](state, concert){
        state.concert = concert
    },
    [FETCH_START](state){
        state.isLoading = true
    },
    [FETCH_END](state, concerts){
        state.concerts = concerts
        state.concertsCount = concerts.length
        state.isLoading = false
    },
    [RESET_STATE](){
        for (let f in state){
            Vue.set(state, f, initialState[f])
        }
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}